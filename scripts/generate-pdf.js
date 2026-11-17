import fs from 'fs';
import zlib from 'zlib';

function escapePdfText(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

class PDFBuilder {
  constructor() {
    this.objects = []; // index -> { body: Buffer | string }
    this.images = {};  // name -> objId
    this.pageIds = [];
  }

  createObj(content) {
    this.objects.push({ body: content });
    return this.objects.length; // 1-based objId
  }

  setObj(id, content) {
    this.objects[id - 1] = { body: content };
  }

  addJpeg(filePath, name) {
    if (!fs.existsSync(filePath)) return null;
    const buf = fs.readFileSync(filePath);
    
    // Read JPEG dimensions
    let pos = 2;
    let width = 800, height = 600;
    while (pos < buf.length) {
      if (buf[pos] !== 0xFF) break;
      const marker = buf[pos + 1];
      if (marker === 0xC0 || marker === 0xC2) {
        height = buf.readUInt16BE(pos + 5);
        width = buf.readUInt16BE(pos + 7);
        break;
      }
      const len = buf.readUInt16BE(pos + 2);
      pos += 2 + len;
    }

    const dict = `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${buf.length} >>\nstream\n`;
    const end = `\nendstream`;
    const full = Buffer.concat([Buffer.from(dict), buf, Buffer.from(end)]);
    const id = this.createObj(full);
    this.images[name] = id;
    return id;
  }

  addPngRgb(filePath, name) {
    if (!fs.existsSync(filePath)) return null;
    const buf = fs.readFileSync(filePath);
    let offset = 8;
    const idatChunks = [];
    let width = 254, height = 192;

    while (offset < buf.length) {
      const len = buf.readUInt32BE(offset);
      const type = buf.slice(offset + 4, offset + 8).toString('ascii');
      const data = buf.slice(offset + 8, offset + 8 + len);
      if (type === 'IHDR') {
        width = data.readUInt32BE(0);
        height = data.readUInt32BE(4);
      } else if (type === 'IDAT') {
        idatChunks.push(data);
      }
      offset += 12 + len;
    }

    const raw = zlib.inflateSync(Buffer.concat(idatChunks));
    const bpp = 4;
    const stride = 1 + width * bpp;
    const rgb = Buffer.alloc(width * height * 3);
    const pixels = Buffer.alloc(width * height * 4);

    function paeth(a, b, c) {
      const p = a + b - c;
      const pa = Math.abs(p - a);
      const pb = Math.abs(p - b);
      const pc = Math.abs(p - c);
      if (pa <= pb && pa <= pc) return a;
      if (pb <= pc) return b;
      return c;
    }

    for (let y = 0; y < height; y++) {
      const rowStart = y * stride;
      const filterType = raw[rowStart];
      for (let x = 0; x < width; x++) {
        for (let c = 0; c < bpp; c++) {
          const cur = raw[rowStart + 1 + x * bpp + c];
          const left = x > 0 ? pixels[(y * width + (x - 1)) * 4 + c] : 0;
          const up = y > 0 ? pixels[((y - 1) * width + x) * 4 + c] : 0;
          const upLeft = (x > 0 && y > 0) ? pixels[((y - 1) * width + (x - 1)) * 4 + c] : 0;
          let val = cur;
          if (filterType === 1) val = (cur + left) & 0xff;
          else if (filterType === 2) val = (cur + up) & 0xff;
          else if (filterType === 3) val = (cur + Math.floor((left + up) / 2)) & 0xff;
          else if (filterType === 4) val = (cur + paeth(left, up, upLeft)) & 0xff;
          pixels[(y * width + x) * 4 + c] = val;
        }
        const idx4 = (y * width + x) * 4;
        const idx3 = (y * width + x) * 3;
        const alpha = pixels[idx4 + 3] / 255;
        // Composite on soft pastel white background
        rgb[idx3] = Math.round(pixels[idx4] * alpha + 255 * (1 - alpha));
        rgb[idx3 + 1] = Math.round(pixels[idx4 + 1] * alpha + 255 * (1 - alpha));
        rgb[idx3 + 2] = Math.round(pixels[idx4 + 2] * alpha + 255 * (1 - alpha));
      }
    }

    const deflated = zlib.deflateSync(rgb);
    const dict = `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ${deflated.length} >>\nstream\n`;
    const end = `\nendstream`;
    const full = Buffer.concat([Buffer.from(dict), deflated, Buffer.from(end)]);
    const id = this.createObj(full);
    this.images[name] = id;
    return id;
  }

  addPage(ops) {
    const streamContent = ops.join('\n');
    const deflated = zlib.deflateSync(Buffer.from(streamContent));
    const streamObjId = this.createObj(
      Buffer.concat([
        Buffer.from(`<< /Length ${deflated.length} /Filter /FlateDecode >>\nstream\n`),
        deflated,
        Buffer.from(`\nendstream`)
      ])
    );

    let xobjStr = '';
    for (const [name, id] of Object.entries(this.images)) {
      xobjStr += `/${name} ${id} 0 R `;
    }

    const pageObjId = this.createObj(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] ` +
      `/Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> /XObject << ${xobjStr}>> >> ` +
      `/Contents ${streamObjId} 0 R >>`
    );

    this.pageIds.push(pageObjId);
  }

  buildPDF(outputPath) {
    // 1: Catalog
    this.setObj(1, `<< /Type /Catalog /Pages 2 0 R >>`);
    // 2: Pages
    const kidsStr = this.pageIds.map(id => `${id} 0 R`).join(' ');
    this.setObj(2, `<< /Type /Pages /Kids [${kidsStr}] /Count ${this.pageIds.length} >>`);

    // Output chunks
    const chunks = [Buffer.from('%PDF-1.4\n')];
    const offsets = [];

    for (let i = 0; i < this.objects.length; i++) {
      const objId = i + 1;
      const off = Buffer.byteLength(Buffer.concat(chunks));
      offsets.push(off);
      const body = this.objects[i].body;
      const header = Buffer.from(`${objId} 0 obj\n`);
      const footer = Buffer.from(`\nendobj\n`);
      if (Buffer.isBuffer(body)) {
        chunks.push(header, body, footer);
      } else {
        chunks.push(header, Buffer.from(body), footer);
      }
    }

    const startXref = Buffer.byteLength(Buffer.concat(chunks));
    let xref = `xref\n0 ${this.objects.length + 1}\n0000000000 65535 f \n`;
    for (const off of offsets) {
      xref += off.toString().padStart(10, '0') + ' 00000 n \n';
    }
    chunks.push(Buffer.from(xref));
    chunks.push(
      Buffer.from(`trailer\n<< /Size ${this.objects.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`)
    );

    const fullPdf = Buffer.concat(chunks);
    fs.writeFileSync(outputPath, fullPdf);
    console.log(`Successfully built PDF: ${outputPath} (${fullPdf.length} bytes, ${this.pageIds.length} pages)`);
  }
}

// Drawing Helper Methods
class PageOps {
  constructor(pageNumber, totalPages) {
    this.ops = [];
    this.pageNum = pageNumber;
    this.totalPages = totalPages;

    // Background pastel gradient wash (soft pastel blue & pink)
    this.drawRect(0, 0, 595.28, 841.89, [0.93, 0.96, 0.99], null, 0); // Pastel Blue #EDF5FC
    // Soft Pink decorative wash top-right
    this.drawRect(350, 600, 245.28, 241.89, [0.99, 0.94, 0.96], null, 0); // Pastel Pink #FDF0F5
    // Soft Blue decorative wash bottom-left
    this.drawRect(0, 0, 260, 250, [0.91, 0.95, 0.99], null, 0);

    // Top Header Banner
    this.drawImage('bvp_logo', 36, 807, 26, 20);
    this.drawText('Bharati Vidyapeeth Deemed to be University, Pune • Department of CSE', 70, 814, 'F2', 9, [0.15, 0.20, 0.29]);
    this.drawText(`Probability & Statistics PBL • Handout Page ${pageNumber} of ${totalPages}`, 350, 814, 'F1', 9, [0.4, 0.46, 0.54]);
    this.drawLine(36, 802, 559.28, 802, [0.75, 0.82, 0.92], 1);

    // Bottom Footer Banner
    this.drawLine(36, 44, 559.28, 44, [0.75, 0.82, 0.92], 1);
    this.drawText('Course: FY B.Tech CSE (Division C, 2026–27) • Topic 1: Correlation', 36, 32, 'F1', 8.5, [0.4, 0.46, 0.54]);
    this.drawText(`Page ${pageNumber} of ${totalPages}`, 510, 32, 'F2', 8.5, [0.4, 0.46, 0.54]);
  }

  drawRect(x, y, w, h, fillRgb, strokeRgb, lineWidth = 1) {
    let s = 'q ';
    if (fillRgb) {
      s += `${fillRgb[0].toFixed(3)} ${fillRgb[1].toFixed(3)} ${fillRgb[2].toFixed(3)} rg `;
    }
    if (strokeRgb) {
      s += `${strokeRgb[0].toFixed(3)} ${strokeRgb[1].toFixed(3)} ${strokeRgb[2].toFixed(3)} RG ${lineWidth} w `;
    }
    s += `${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re `;
    if (fillRgb && strokeRgb) s += 'B Q';
    else if (fillRgb) s += 'f Q';
    else if (strokeRgb) s += 'S Q';
    else s += 'Q';
    this.ops.push(s);
  }

  drawLine(x1, y1, x2, y2, strokeRgb, lineWidth = 1) {
    this.ops.push(
      `q ${strokeRgb[0].toFixed(3)} ${strokeRgb[1].toFixed(3)} ${strokeRgb[2].toFixed(3)} RG ${lineWidth} w ` +
      `${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S Q`
    );
  }

  drawText(text, x, y, font = 'F1', size = 10, rgb = [0.15, 0.20, 0.29]) {
    const escaped = escapePdfText(text);
    this.ops.push(
      `BT /${font} ${size} Tf ${rgb[0].toFixed(3)} ${rgb[1].toFixed(3)} ${rgb[2].toFixed(3)} rg ` +
      `${x.toFixed(2)} ${y.toFixed(2)} Td (${escaped}) Tj ET`
    );
  }

  drawImage(name, x, y, w, h) {
    this.ops.push(
      `q ${w.toFixed(2)} 0 0 ${h.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm /${name} Do Q`
    );
  }

  // Draw a standard Presentation Slide Card
  drawSlideCard(x, y, w, h, badgeText, title, subtitle) {
    // Card Background (Crisp White Card with subtle border)
    this.drawRect(x, y, w, h, [0.99, 0.99, 1.0], [0.85, 0.89, 0.95], 1.2);
    // Subtle top accent bar (Pastel Purple / Pink gradient visual)
    this.drawRect(x, y + h - 4, w, 4, [0.49, 0.36, 0.99], null, 0);

    // Slide Badge (Pill)
    const badgeW = badgeText.length * 5.5 + 14;
    this.drawRect(x + 14, y + h - 26, badgeW, 16, [0.91, 0.88, 0.98], [0.82, 0.76, 0.96], 0.8);
    this.drawText(badgeText, x + 20, y + h - 22, 'F2', 7.5, [0.49, 0.36, 0.99]);

    // Top-right mini BVP crest
    this.drawImage('bvp_logo', x + w - 44, y + h - 27, 24, 18);

    // Title & Subtitle
    this.drawText(title, x + 14, y + h - 44, 'F2', 13.5, [0.15, 0.20, 0.29]);
    this.drawText(subtitle, x + 14, y + h - 57, 'F1', 8.5, [0.35, 0.42, 0.52]);

    // Thin separator
    this.drawLine(x + 14, y + h - 64, x + w - 14, y + h - 64, [0.90, 0.93, 0.97], 0.8);
  }
}

// Main execution
const pdf = new PDFBuilder();

// Reserve 1 (Catalog) and 2 (Pages)
pdf.createObj('catalog_placeholder');
pdf.createObj('pages_placeholder');

// Fonts
pdf.createObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`); // 3
pdf.createObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`); // 4
pdf.createObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>`); // 5

// Register Images
pdf.addPngRgb('public/images/bvp-logo.png', 'bvp_logo');
pdf.addJpeg('public/images/cold-drinks-summer.jpg', 'img_cold_drinks');
pdf.addJpeg('public/images/student-studying.jpg', 'img_student_study');
pdf.addJpeg('public/images/speedometer-travel.jpg', 'img_speedometer');
pdf.addJpeg('public/images/student-library.jpg', 'img_student_lib');
pdf.addJpeg('public/images/healthcare-research.jpg', 'img_health');
pdf.addJpeg('public/images/agriculture-farm.jpg', 'img_agri');
pdf.addJpeg('public/images/weather-forecasting.jpg', 'img_weather');
pdf.addJpeg('public/images/business-sales.jpg', 'img_business');
pdf.addJpeg('public/images/marketing-analytics.jpg', 'img_marketing');
pdf.addJpeg('public/images/transportation-traffic.jpg', 'img_transport');
pdf.addJpeg('public/images/engineering-systems.jpg', 'img_engineer');

console.log('Images registered successfully');

// ================= PAGE 1: SLIDE 1 & SLIDE 2 =================
{
  const p = new PageOps(1, 8);
  p.drawSlideCard(36, 428, 523.28, 354, 'SLIDE 01 • TITLE', 'CORRELATION', 'Understanding the Relationship Between Two Variables • FY B.Tech CSE');
  
  p.drawRect(52, 630, 491, 75, [0.95, 0.93, 0.99], [0.85, 0.80, 0.96], 1);
  p.drawText('PROJECT TEAM PRESENTERS', 64, 690, 'F2', 8.5, [0.49, 0.36, 0.99]);
  p.drawText('Niharika, Riya, Sukruti and Anushka', 64, 668, 'F2', 14, [0.15, 0.20, 0.29]);
  p.drawText('Department of Computer Science & Engineering • Division: C | FY CSE • Academic Year: 2026–27', 64, 646, 'F1', 9, [0.35, 0.42, 0.52]);

  p.drawRect(52, 452, 155, 160, [0.99, 0.95, 0.94], [0.98, 0.85, 0.82], 1);
  p.drawText('Positive Correlation (r > 0)', 62, 595, 'F2', 9.5, [0.90, 0.35, 0.25]);
  p.drawText('Both variables move together in', 62, 578, 'F1', 8.5, [0.35, 0.42, 0.52]);
  p.drawText('the same direction (upward slope).', 62, 564, 'F1', 8.5, [0.35, 0.42, 0.52]);
  p.drawText('Ex: Study hours vs Exam score', 62, 545, 'F3', 8, [0.49, 0.36, 0.99]);

  p.drawRect(220, 452, 155, 160, [0.94, 0.96, 0.99], [0.80, 0.88, 0.98], 1);
  p.drawText('Negative Correlation (r < 0)', 230, 595, 'F2', 9.5, [0.15, 0.45, 0.85]);
  p.drawText('Variables move inversely in', 230, 578, 'F1', 8.5, [0.35, 0.42, 0.52]);
  p.drawText('opposite directions (downward slope).', 230, 564, 'F1', 8.5, [0.35, 0.42, 0.52]);
  p.drawText('Ex: Vehicle speed vs Travel time', 230, 545, 'F3', 8, [0.49, 0.36, 0.99]);

  p.drawRect(388, 452, 155, 160, [0.98, 0.98, 0.94], [0.95, 0.92, 0.78], 1);
  p.drawText('Zero Correlation (r ≈ 0)', 398, 595, 'F2', 9.5, [0.75, 0.55, 0.15]);
  p.drawText('Points form a random cloud with', 398, 578, 'F1', 8.5, [0.35, 0.42, 0.52]);
  p.drawText('no linear relationship.', 398, 564, 'F1', 8.5, [0.35, 0.42, 0.52]);
  p.drawText('Ex: Shoe size vs Exam marks', 398, 545, 'F3', 8, [0.49, 0.36, 0.99]);

  // Slide 2 (Bottom)
  p.drawSlideCard(36, 56, 523.28, 354, 'SLIDE 02 • ABSTRACT', 'Abstract & Problem Statement', 'Bivariate analysis, quantification, methodology, and engineering scope');
  
  p.drawRect(52, 230, 238, 70, [0.94, 0.97, 0.99], [0.80, 0.88, 0.98], 1);
  p.drawText('1. Bivariate Analysis', 62, 282, 'F2', 10, [0.15, 0.45, 0.85]);
  p.drawText('Studies pairs of numerical observations (X, Y) measured on', 62, 266, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('the same sample to discover mutual dependencies.', 62, 252, 'F1', 8, [0.25, 0.32, 0.42]);

  p.drawRect(305, 230, 238, 70, [0.96, 0.94, 0.99], [0.86, 0.80, 0.96], 1);
  p.drawText('2. Mathematical Metric (r)', 315, 282, 'F2', 10, [0.49, 0.36, 0.99]);
  p.drawText("Karl Pearson's coefficient provides a scale-free, unitless", 315, 266, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('measure strictly bounded between -1.0 and +1.0.', 315, 252, 'F1', 8, [0.25, 0.32, 0.42]);

  p.drawRect(52, 146, 238, 70, [0.99, 0.94, 0.96], [0.96, 0.82, 0.88], 1);
  p.drawText('3. 6-Step Methodology', 62, 198, 'F2', 10, [0.85, 0.20, 0.45]);
  p.drawText('Encompasses data cleaning, scatter diagram inspection,', 62, 182, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('direct computation, and causation screening.', 62, 168, 'F1', 8, [0.25, 0.32, 0.42]);

  p.drawRect(305, 146, 238, 70, [0.99, 0.97, 0.92], [0.95, 0.88, 0.70], 1);
  p.drawText('4. Engineering Applications', 315, 198, 'F2', 10, [0.75, 0.45, 0.10]);
  p.drawText('Foundational for machine learning feature selection, sensor', 315, 182, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('analytics, predictive maintenance, and decision science.', 315, 168, 'F1', 8, [0.25, 0.32, 0.42]);

  p.drawRect(52, 74, 491, 54, [0.97, 0.98, 0.99], [0.82, 0.88, 0.95], 1);
  p.drawText('CORE STATISTICAL PRINCIPLE:', 64, 110, 'F2', 8.5, [0.49, 0.36, 0.99]);
  p.drawText('Correlation measures mutual co-variation symmetrically without assuming an independent vs dependent hierarchy.', 64, 94, 'F1', 8.5, [0.20, 0.28, 0.38]);

  pdf.addPage(p.ops);
}

// ================= PAGE 2: SLIDE 3 & SLIDE 4 =================
{
  const p = new PageOps(2, 8);
  p.drawSlideCard(36, 428, 523.28, 354, 'SLIDE 03 • INTRODUCTION', 'Understanding Two Variables', 'Daily Summer Temperature vs Cold Drink Sales Revenue Case');
  
  p.drawImage('img_cold_drinks', 52, 514, 210, 140);
  p.drawRect(52, 494, 210, 18, [0.95, 0.97, 0.99], null, 0);
  p.drawText('Cold beverages demand surges on hot summer days', 56, 500, 'F3', 7.5, [0.4, 0.46, 0.54]);

  p.drawRect(275, 514, 268, 140, [0.94, 0.97, 0.99], [0.80, 0.88, 0.98], 1);
  p.drawText('The Real-Life Observation:', 287, 634, 'F2', 10.5, [0.15, 0.45, 0.85]);
  p.drawText('When summer temperature increases from 25°C to 40°C,', 287, 616, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('beverage stall revenue spikes proportionally.', 287, 602, 'F1', 8.5, [0.25, 0.32, 0.42]);
  
  p.drawRect(287, 540, 244, 46, [1, 1, 1], [0.85, 0.90, 0.95], 1);
  p.drawText('Variable X: Daily Temperature (°C) [Continuous]', 295, 568, 'F2', 8, [0.49, 0.36, 0.99]);
  p.drawText('Variable Y: Sales Revenue (₹) [Continuous]', 295, 552, 'F2', 8, [0.90, 0.35, 0.25]);

  p.drawRect(52, 444, 491, 42, [0.96, 0.94, 0.99], [0.86, 0.80, 0.96], 1);
  p.drawText('Formal Definition: When two variables change such that an increase or decrease in one corresponds', 64, 468, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('systematically to an increase or decrease in the other, they are statistically CORRELATED.', 64, 454, 'F2', 8.5, [0.49, 0.36, 0.99]);

  // Slide 4 (Bottom)
  p.drawSlideCard(36, 56, 523.28, 354, 'SLIDE 04 • THEORY', 'Theory of Correlation: Types & Scatter Plots', 'Direction, strength, scatter diagrams, and linear relationships');

  p.drawRect(52, 200, 155, 120, [0.99, 0.95, 0.94], [0.98, 0.85, 0.82], 1);
  p.drawText('+ Positive Correlation', 62, 302, 'F2', 10, [0.90, 0.35, 0.25]);
  p.drawText('Variables move in the SAME', 62, 286, 'F2', 8, [0.25, 0.32, 0.42]);
  p.drawText('direction (upward trend).', 62, 274, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('• Study hours vs Marks', 62, 256, 'F1', 8, [0.35, 0.42, 0.52]);
  p.drawText('• Temperature vs Sales', 62, 244, 'F1', 8, [0.35, 0.42, 0.52]);
  p.drawText('• Height vs Weight', 62, 232, 'F1', 8, [0.35, 0.42, 0.52]);
  p.drawText('r > 0 (Slope is positive)', 62, 212, 'F2', 8, [0.90, 0.35, 0.25]);

  p.drawRect(220, 200, 155, 120, [0.94, 0.96, 0.99], [0.80, 0.88, 0.98], 1);
  p.drawText('- Negative Correlation', 230, 302, 'F2', 10, [0.15, 0.45, 0.85]);
  p.drawText('Variables move in OPPOSITE', 230, 286, 'F2', 8, [0.25, 0.32, 0.42]);
  p.drawText('directions (downward trend).', 230, 274, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('• Speed vs Travel time', 230, 256, 'F1', 8, [0.35, 0.42, 0.52]);
  p.drawText('• Price vs Consumer demand', 230, 244, 'F1', 8, [0.35, 0.42, 0.52]);
  p.drawText('• Altitude vs Air pressure', 230, 232, 'F1', 8, [0.35, 0.42, 0.52]);
  p.drawText('r < 0 (Slope is negative)', 230, 212, 'F2', 8, [0.15, 0.45, 0.85]);

  p.drawRect(388, 200, 155, 120, [0.98, 0.98, 0.94], [0.95, 0.92, 0.78], 1);
  p.drawText('0 Zero Correlation', 398, 302, 'F2', 10, [0.75, 0.55, 0.15]);
  p.drawText('NO linear relationship.', 398, 286, 'F2', 8, [0.25, 0.32, 0.42]);
  p.drawText('Points form a random cloud.', 398, 274, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('• Shoe size vs IQ', 398, 256, 'F1', 8, [0.35, 0.42, 0.52]);
  p.drawText('• Daily rainfall vs Gold rates', 398, 244, 'F1', 8, [0.35, 0.42, 0.52]);
  p.drawText('• Phone battery vs Grade', 398, 232, 'F1', 8, [0.35, 0.42, 0.52]);
  p.drawText('r ≈ 0 (No systematic trend)', 398, 212, 'F2', 8, [0.75, 0.55, 0.15]);

  p.drawRect(52, 74, 491, 108, [0.98, 0.98, 0.99], [0.88, 0.92, 0.96], 1);
  p.drawText('The Essential Role of the Scatter Diagram:', 64, 166, 'F2', 9.5, [0.49, 0.36, 0.99]);
  p.drawText('1. Visual Diagnostic First: Before running any statistical algorithm, plotting a scatter diagram is mandatory.', 64, 150, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('2. Linearity Verification: Pearson\'s r only evaluates straight-line linearity; curvilinear trends require transformation.', 64, 136, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('3. Outlier Screening: Even a single erroneous data point can drastically alter the computed coefficient.', 64, 122, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('4. Strength Evaluation: Points tightly grouped along a line indicate high strength; scattered clouds indicate weak strength.', 64, 108, 'F1', 8, [0.25, 0.32, 0.42]);

  pdf.addPage(p.ops);
}

// ================= PAGE 3: SLIDE 5 & SLIDE 6 =================
{
  const p = new PageOps(3, 8);
  p.drawSlideCard(36, 428, 523.28, 354, 'SLIDE 05 • FORMULA', "Formula & Karl Pearson's Coefficient (r)", 'Mathematical derivation, direct formula, and verbal interpretation scale');

  p.drawRect(52, 646, 491, 56, [0.96, 0.94, 0.99], [0.82, 0.76, 0.96], 1.2);
  p.drawText("KARL PEARSON'S DIRECT COMPUTATIONAL FORMULA:", 64, 686, 'F2', 8.5, [0.49, 0.36, 0.99]);
  p.drawText('r = [ nΣXY - (ΣX)(ΣY) ] / √[ { nΣX² - (ΣX)² } · { nΣY² - (ΣY)² } ]', 100, 660, 'F2', 12.5, [0.15, 0.20, 0.29]);

  p.drawRect(52, 444, 238, 185, [0.94, 0.97, 0.99], [0.80, 0.88, 0.98], 1);
  p.drawText('Mathematical Properties of r:', 64, 612, 'F2', 9.5, [0.15, 0.45, 0.85]);
  p.drawText('1. Bounded Interval: Strictly -1.0 ≤ r ≤ +1.0.', 64, 594, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('2. Dimensionless: A pure unitless number.', 64, 578, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('3. Scale & Origin Invariance: Adding or', 64, 562, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('   multiplying by constants does not alter r.', 64, 550, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('4. Perfect Alignment: r = +1.0 or -1.0 means all', 64, 534, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('   points lie exactly on a single straight line.', 64, 522, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('5. Symmetry: r(X, Y) = r(Y, X).', 64, 506, 'F1', 8.5, [0.25, 0.32, 0.42]);

  p.drawRect(305, 444, 238, 185, [0.98, 0.95, 0.99], [0.90, 0.82, 0.96], 1);
  p.drawText('Standard Verbal Interpretation Scale:', 317, 612, 'F2', 9.5, [0.49, 0.36, 0.99]);
  p.drawText('+0.80 to +1.00 : Very Strong Positive', 317, 592, 'F2', 8, [0.10, 0.60, 0.30]);
  p.drawText('+0.60 to +0.80 : Strong Positive', 317, 576, 'F1', 8, [0.15, 0.65, 0.35]);
  p.drawText('+0.40 to +0.60 : Moderate Positive', 317, 560, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('-0.20 to +0.20 : Negligible / Very Weak', 317, 544, 'F1', 8, [0.55, 0.55, 0.55]);
  p.drawText('-0.40 to -0.60 : Moderate Negative', 317, 528, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('-0.60 to -0.80 : Strong Negative', 317, 512, 'F1', 8, [0.80, 0.30, 0.20]);
  p.drawText('-0.80 to -1.00 : Very Strong Negative', 317, 496, 'F2', 8, [0.85, 0.15, 0.15]);

  // Slide 6 (Bottom)
  p.drawSlideCard(36, 56, 523.28, 354, 'SLIDE 06 • EXAMPLE 1 PROBLEM', 'Numerical Example 1: Study Hours vs Exam Score', 'Problem statement and raw bivariate observation sample (n = 5)');

  p.drawImage('img_student_study', 52, 180, 210, 135);
  p.drawRect(52, 160, 210, 18, [0.95, 0.97, 0.99], null, 0);
  p.drawText('Sample of n = 5 engineering students', 72, 166, 'F3', 7.5, [0.4, 0.46, 0.54]);

  p.drawRect(275, 160, 268, 155, [1, 1, 1], [0.82, 0.88, 0.95], 1);
  p.drawRect(275, 290, 268, 25, [0.93, 0.96, 0.99], null, 0);
  p.drawText('Student', 285, 298, 'F2', 8.5, [0.15, 0.20, 0.29]);
  p.drawText('Study Hours (X)', 350, 298, 'F2', 8.5, [0.15, 0.20, 0.29]);
  p.drawText('Exam Score (Y)', 455, 298, 'F2', 8.5, [0.15, 0.20, 0.29]);

  const rows1 = [
    ['Student A', '2 hrs', '50 / 100'],
    ['Student B', '4 hrs', '60 / 100'],
    ['Student C', '6 hrs', '70 / 100'],
    ['Student D', '8 hrs', '80 / 100'],
    ['Student E', '10 hrs', '95 / 100'],
  ];
  for (let i = 0; i < rows1.length; i++) {
    const ypos = 268 - i * 24;
    p.drawText(rows1[i][0], 285, ypos, 'F1', 8, [0.35, 0.42, 0.52]);
    p.drawText(rows1[i][1], 370, ypos, 'F2', 8, [0.49, 0.36, 0.99]);
    p.drawText(rows1[i][2], 470, ypos, 'F2', 8, [0.90, 0.35, 0.25]);
    p.drawLine(275, ypos - 6, 543, ypos - 6, [0.93, 0.95, 0.98], 0.6);
  }

  p.drawRect(52, 74, 491, 68, [0.99, 0.95, 0.96], [0.96, 0.84, 0.88], 1);
  p.drawText('Initial Engineering Hypothesis & Objectives:', 64, 126, 'F2', 9, [0.85, 0.20, 0.45]);
  p.drawText('1. Predictable Positive Direction: Students allocating more preparation time achieve higher marks.', 64, 110, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('2. Calculation Target: Construct the full computation table (X, Y, XY, X², Y²) and determine Pearson\'s r.', 64, 96, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('3. Expected Outcome: Strong positive correlation (r close to +1.0).', 64, 82, 'F2', 8, [0.49, 0.36, 0.99]);

  pdf.addPage(p.ops);
}

// ================= PAGE 4: SLIDE 7 & SLIDE 8 =================
{
  const p = new PageOps(4, 8);
  p.drawSlideCard(36, 428, 523.28, 354, 'SLIDE 07 • EXAMPLE 1 SOLUTION', 'Example 1: Complete Step-by-Step Solution', 'Full arithmetic table, formula substitution, and result: r ≈ +0.991');

  p.drawRect(52, 574, 491, 142, [1, 1, 1], [0.85, 0.89, 0.95], 1);
  p.drawRect(52, 692, 491, 24, [0.94, 0.96, 0.99], null, 0);
  p.drawText('Obs', 64, 700, 'F2', 8.5);
  p.drawText('X (Hours)', 120, 700, 'F2', 8.5);
  p.drawText('Y (Marks)', 200, 700, 'F2', 8.5);
  p.drawText('XY', 290, 700, 'F2', 8.5);
  p.drawText('X²', 380, 700, 'F2', 8.5);
  p.drawText('Y²', 470, 700, 'F2', 8.5);

  const t1 = [
    ['1', '2', '50', '100', '4', '2500'],
    ['2', '4', '60', '240', '16', '3600'],
    ['3', '6', '70', '420', '36', '4900'],
    ['4', '8', '80', '640', '64', '6400'],
    ['5', '10', '95', '950', '100', '9025'],
  ];
  for (let i = 0; i < t1.length; i++) {
    const ypos = 672 - i * 18;
    p.drawText(t1[i][0], 64, ypos, 'F1', 8);
    p.drawText(t1[i][1], 130, ypos, 'F1', 8);
    p.drawText(t1[i][2], 210, ypos, 'F1', 8);
    p.drawText(t1[i][3], 295, ypos, 'F1', 8);
    p.drawText(t1[i][4], 385, ypos, 'F1', 8);
    p.drawText(t1[i][5], 475, ypos, 'F1', 8);
  }
  p.drawRect(52, 574, 491, 20, [0.88, 0.94, 0.99], null, 0);
  p.drawText('TOTAL', 64, 580, 'F2', 8.5, [0.03, 0.40, 0.65]);
  p.drawText('ΣX = 30', 125, 580, 'F2', 8.5, [0.03, 0.40, 0.65]);
  p.drawText('ΣY = 355', 205, 580, 'F2', 8.5, [0.03, 0.40, 0.65]);
  p.drawText('ΣXY = 2370', 285, 580, 'F2', 8.5, [0.03, 0.40, 0.65]);
  p.drawText('ΣX² = 220', 375, 580, 'F2', 8.5, [0.03, 0.40, 0.65]);
  p.drawText('ΣY² = 26325', 465, 580, 'F2', 8.5, [0.03, 0.40, 0.65]);

  p.drawRect(52, 444, 491, 118, [0.96, 0.94, 0.99], [0.86, 0.80, 0.96], 1);
  p.drawText('Substitution and Arithmetic Breakdown:', 64, 546, 'F2', 9.5, [0.49, 0.36, 0.99]);
  p.drawText('• Numerator = nΣXY - (ΣX)(ΣY) = 5(2370) - (30)(355) = 11850 - 10650 = +1200', 64, 530, 'F1', 8.5);
  p.drawText('• Term 1 = nΣX² - (ΣX)² = 5(220) - 900 = 1100 - 900 = 200', 64, 514, 'F1', 8.5);
  p.drawText('• Term 2 = nΣY² - (ΣY)² = 5(26325) - 126025 = 131625 - 126025 = 5600', 64, 498, 'F1', 8.5);
  p.drawText('• Denominator = √(200 · 5600) = √1,120,000 ≈ 1058.30', 64, 482, 'F1', 8.5);
  p.drawText('RESULT: r = +1200 / 1058.30 ≈ +0.991  (Exceptionally Strong Positive Correlation)', 64, 460, 'F2', 10, [0.10, 0.55, 0.25]);

  // Slide 8 (Bottom)
  p.drawSlideCard(36, 56, 523.28, 354, 'SLIDE 08 • EXAMPLE 2 PROBLEM', 'Numerical Example 2: Vehicle Speed vs Travel Time', 'Testing inverse relationship over a fixed 100 km test route (n = 5)');

  p.drawImage('img_speedometer', 52, 180, 210, 135);
  p.drawRect(52, 160, 210, 18, [0.95, 0.97, 0.99], null, 0);
  p.drawText('Vehicle cruise speed testing on 100 km test circuit', 60, 166, 'F3', 7.5, [0.4, 0.46, 0.54]);

  p.drawRect(275, 160, 268, 155, [1, 1, 1], [0.82, 0.88, 0.95], 1);
  p.drawRect(275, 290, 268, 25, [0.94, 0.96, 0.99], null, 0);
  p.drawText('Trial', 285, 298, 'F2', 8.5, [0.15, 0.20, 0.29]);
  p.drawText('Speed (km/h) (X)', 340, 298, 'F2', 8.5, [0.15, 0.20, 0.29]);
  p.drawText('Time (hours) (Y)', 455, 298, 'F2', 8.5, [0.15, 0.20, 0.29]);

  const rows2 = [
    ['Trial 1', '20 km/h', '5.0 hrs'],
    ['Trial 2', '40 km/h', '2.5 hrs'],
    ['Trial 3', '60 km/h', '1.7 hrs'],
    ['Trial 4', '80 km/h', '1.3 hrs'],
    ['Trial 5', '100 km/h', '1.0 hr'],
  ];
  for (let i = 0; i < rows2.length; i++) {
    const ypos = 268 - i * 24;
    p.drawText(rows2[i][0], 285, ypos, 'F1', 8, [0.35, 0.42, 0.52]);
    p.drawText(rows2[i][1], 360, ypos, 'F2', 8, [0.15, 0.45, 0.85]);
    p.drawText(rows2[i][2], 470, ypos, 'F2', 8, [0.85, 0.20, 0.20]);
    p.drawLine(275, ypos - 6, 543, ypos - 6, [0.93, 0.95, 0.98], 0.6);
  }

  p.drawRect(52, 74, 491, 68, [0.94, 0.97, 0.99], [0.80, 0.88, 0.98], 1);
  p.drawText('Physical Principle & Direction Prediction:', 64, 126, 'F2', 9, [0.15, 0.45, 0.85]);
  p.drawText('1. Inverse Physics Formulation: By definition, Time = Distance / Speed; higher cruise speed reduces trip duration.', 64, 110, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('2. Directional Expectation: As variable X increases, variable Y declines systematically.', 64, 96, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('3. Expected Outcome: Strong negative correlation (r strictly less than 0).', 64, 82, 'F2', 8, [0.85, 0.20, 0.20]);

  pdf.addPage(p.ops);
}

// ================= PAGE 5: SLIDE 9 & SLIDE 10 =================
{
  const p = new PageOps(5, 8);
  p.drawSlideCard(36, 428, 523.28, 354, 'SLIDE 09 • EXAMPLE 2 SOLUTION', 'Example 2: Complete Solution & Contrast', 'Full calculation table, negative numerator, and result: r ≈ -0.890');

  p.drawRect(52, 574, 491, 142, [1, 1, 1], [0.85, 0.89, 0.95], 1);
  p.drawRect(52, 692, 491, 24, [0.94, 0.96, 0.99], null, 0);
  p.drawText('Obs', 64, 700, 'F2', 8.5);
  p.drawText('X (Speed)', 120, 700, 'F2', 8.5);
  p.drawText('Y (Time)', 200, 700, 'F2', 8.5);
  p.drawText('XY', 290, 700, 'F2', 8.5);
  p.drawText('X²', 380, 700, 'F2', 8.5);
  p.drawText('Y²', 470, 700, 'F2', 8.5);

  const t2 = [
    ['1', '20', '5.0', '100.0', '400', '25.00'],
    ['2', '40', '2.5', '100.0', '1600', '6.25'],
    ['3', '60', '1.7', '102.0', '3600', '2.89'],
    ['4', '80', '1.3', '104.0', '6400', '1.69'],
    ['5', '100', '1.0', '100.0', '10000', '1.00'],
  ];
  for (let i = 0; i < t2.length; i++) {
    const ypos = 672 - i * 18;
    p.drawText(t2[i][0], 64, ypos, 'F1', 8);
    p.drawText(t2[i][1], 130, ypos, 'F1', 8);
    p.drawText(t2[i][2], 210, ypos, 'F1', 8);
    p.drawText(t2[i][3], 295, ypos, 'F1', 8);
    p.drawText(t2[i][4], 385, ypos, 'F1', 8);
    p.drawText(t2[i][5], 475, ypos, 'F1', 8);
  }
  p.drawRect(52, 574, 491, 20, [0.99, 0.93, 0.93], null, 0);
  p.drawText('TOTAL', 64, 580, 'F2', 8.5, [0.75, 0.15, 0.15]);
  p.drawText('ΣX = 300', 125, 580, 'F2', 8.5, [0.75, 0.15, 0.15]);
  p.drawText('ΣY = 11.5', 205, 580, 'F2', 8.5, [0.75, 0.15, 0.15]);
  p.drawText('ΣXY = 506.0', 285, 580, 'F2', 8.5, [0.75, 0.15, 0.15]);
  p.drawText('ΣX² = 22000', 375, 580, 'F2', 8.5, [0.75, 0.15, 0.15]);
  p.drawText('ΣY² = 36.83', 465, 580, 'F2', 8.5, [0.75, 0.15, 0.15]);

  p.drawRect(52, 444, 491, 118, [0.94, 0.97, 0.99], [0.80, 0.88, 0.98], 1);
  p.drawText('Substitution and Calculation Details:', 64, 546, 'F2', 9.5, [0.15, 0.45, 0.85]);
  p.drawText('• Numerator = nΣXY - (ΣX)(ΣY) = 5(506) - (300)(11.5) = 2530 - 3450 = -920  (Negative Numerator)', 64, 530, 'F1', 8.5);
  p.drawText('• Term 1 = nΣX² - (ΣX)² = 5(22000) - 90000 = 110000 - 90000 = 20000', 64, 514, 'F1', 8.5);
  p.drawText('• Term 2 = nΣY² - (ΣY)² = 5(36.83) - 132.25 = 184.15 - 132.25 = 51.9', 64, 498, 'F1', 8.5);
  p.drawText('• Denominator = √(20000 · 51.9) = √1,038,000 ≈ 1018.82', 64, 482, 'F1', 8.5);
  p.drawText('RESULT: r = -920 / 1018.82 ≈ -0.890  (Strong Negative Correlation)', 64, 460, 'F2', 10, [0.85, 0.15, 0.15]);

  // Slide 10 (Bottom)
  p.drawSlideCard(36, 56, 523.28, 354, 'SLIDE 10 • METHODOLOGY', 'Methodology: How We Study Correlation', 'The systematic 6-step data science lifecycle');

  const steps = [
    ['Step 1: Data Collection & Cleaning', 'Gather paired measurements (X, Y) under controlled, calibrated conditions. Eliminate sensor noise.', [0.15, 0.45, 0.85], [0.94, 0.97, 0.99]],
    ['Step 2: Scatter Plot Visualization', 'Inspect Cartesian coordinates for linear clusters, non-linear curvature, and extreme bivariate outliers.', [0.49, 0.36, 0.99], [0.96, 0.94, 0.99]],
    ['Step 3: Directional Assessment', 'Determine whether trendline slopes upward (positive), downward (negative), or remains flat.', [0.85, 0.20, 0.45], [0.99, 0.94, 0.96]],
    ['Step 4: Formula Computation', "Apply Karl Pearson's product-moment equation manually or using Python/R statistical packages.", [0.75, 0.45, 0.10], [0.99, 0.97, 0.92]],
    ['Step 5: Statistical Interpretation', 'Classify numerical strength on the -1 to +1 scale (weak, moderate, strong) and assess significance.', [0.10, 0.60, 0.30], [0.93, 0.98, 0.94]],
    ['Step 6: Causation & Domain Check', 'Verify physical/logical plausibility; screen for lurking confounding variables (Golden Rule).', [0.49, 0.36, 0.99], [0.96, 0.94, 0.99]],
  ];

  for (let i = 0; i < 6; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = col === 0 ? 52 : 305;
    const by = 240 - row * 82;
    p.drawRect(bx, by, 238, 72, steps[i][3], null, 0);
    p.drawText(steps[i][0], bx + 10, by + 54, 'F2', 9, steps[i][2]);
    p.drawText(steps[i][1].substring(0, 52), bx + 10, by + 36, 'F1', 7.5, [0.25, 0.32, 0.42]);
    p.drawText(steps[i][1].substring(52), bx + 10, by + 24, 'F1', 7.5, [0.25, 0.32, 0.42]);
  }

  pdf.addPage(p.ops);
}

// ================= PAGE 6: SLIDE 11 & SLIDE 12 =================
{
  const p = new PageOps(6, 8);
  p.drawSlideCard(36, 428, 523.28, 354, 'SLIDE 11 • LAB DEMO', 'Visual Representation & Live Graphs Lab', 'Interactive scatter plots, live coefficient engine, and outlier vulnerability');

  p.drawRect(52, 590, 238, 140, [0.96, 0.94, 0.99], [0.86, 0.80, 0.96], 1);
  p.drawText('Extreme Outlier Vulnerability:', 64, 710, 'F2', 10, [0.49, 0.36, 0.99]);
  p.drawText("Because Karl Pearson's formula computes", 64, 692, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('squared deviations (X - X̄)² and (Y - Ȳ)²,', 64, 678, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('a single anomalous point can artificially drag', 64, 664, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('a strong correlation from r = +0.95 down to +0.40.', 64, 650, 'F2', 8.5, [0.85, 0.15, 0.15]);
  p.drawText('Always visualize data before trusting numbers!', 64, 630, 'F3', 8, [0.49, 0.36, 0.99]);

  p.drawRect(305, 590, 238, 140, [0.94, 0.97, 0.99], [0.80, 0.88, 0.98], 1);
  p.drawText('Linearity Restriction:', 317, 710, 'F2', 10, [0.15, 0.45, 0.85]);
  p.drawText("Pearson's r strictly assesses LINEAR trends.", 317, 692, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('For a symmetric U-shaped parabola Y = X²', 317, 678, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('over [-3, +3], Pearson evaluates to r = 0,', 317, 664, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('despite a 100% deterministic relationship!', 317, 650, 'F2', 8.5, [0.85, 0.45, 0.10]);
  p.drawText('Non-linear data requires Spearman or transformation.', 317, 630, 'F3', 8, [0.15, 0.45, 0.85]);

  p.drawRect(52, 444, 491, 134, [0.98, 0.98, 0.99], [0.88, 0.92, 0.96], 1);
  p.drawText('Interactive Web Application Features:', 64, 560, 'F2', 9.5, [0.49, 0.36, 0.99]);
  p.drawText('• Live Draggable Points: Audiences can drag points directly on the canvas to observe real-time r changes.', 64, 542, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('• Preset Dataset Selector: Instant switching between Strong Positive, Strong Negative, and Noisy Cloud.', 64, 526, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('• Real-Time Trendline Regression: Dynamic slope overlay with residual lines indicating distance to trend.', 64, 510, 'F1', 8.5, [0.25, 0.32, 0.42]);
  p.drawText('• Fullscreen & Dark/Light Adaptive: Engineered with Framer Motion for high-impact classroom projection.', 64, 494, 'F1', 8.5, [0.25, 0.32, 0.42]);

  // Slide 12 (Bottom)
  p.drawSlideCard(36, 56, 523.28, 354, 'SLIDE 12 • APPLICATIONS', 'Applications: Education & Healthcare', 'Academic performance analytics and biometric health informatics');

  p.drawRect(52, 74, 238, 250, [0.96, 0.94, 0.99], [0.86, 0.80, 0.96], 1);
  p.drawImage('img_student_lib', 62, 185, 218, 125);
  p.drawText('Education: Attendance vs GPA', 64, 170, 'F2', 10, [0.49, 0.36, 0.99]);
  p.drawText('• Correlating LMS portal logins, assignment submission', 64, 152, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  timelines, and classroom attendance with exam scores.', 64, 140, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('• Strong positive correlation enables automated early-warning', 64, 124, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  flags for students requiring academic counseling.', 64, 112, 'F1', 8, [0.25, 0.32, 0.42]);

  p.drawRect(305, 74, 238, 250, [0.99, 0.94, 0.96], [0.96, 0.82, 0.88], 1);
  p.drawImage('img_health', 315, 185, 218, 125);
  p.drawText('Healthcare: Vitals & Dosage', 317, 170, 'F2', 10, [0.85, 0.20, 0.45]);
  p.drawText('• Correlating daily dietary sodium intake with systolic', 317, 152, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  blood pressure in clinical hypertension trials.', 317, 140, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('• Quantifying negative correlation between aerobic exercise', 317, 124, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  frequency and resting cardiovascular heart rate.', 317, 112, 'F1', 8, [0.25, 0.32, 0.42]);

  pdf.addPage(p.ops);
}

// ================= PAGE 7: SLIDE 13 & SLIDE 14 =================
{
  const p = new PageOps(7, 8);
  p.drawSlideCard(36, 428, 523.28, 354, 'SLIDE 13 • APPLICATIONS', 'Applications: Agriculture & Weather Forecasting', 'Agritech precision irrigation and meteorological grid management');

  p.drawRect(52, 444, 238, 250, [0.93, 0.98, 0.94], [0.75, 0.92, 0.78], 1);
  p.drawImage('img_agri', 62, 555, 218, 125);
  p.drawText('Agriculture: Rainfall vs Crop Yield', 64, 540, 'F2', 10, [0.10, 0.60, 0.30]);
  p.drawText('• Quantifying correlation between seasonal rainfall volume,', 64, 522, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  soil nitrogen levels, and harvested yield per hectare.', 64, 510, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('• Guides automated IoT drip-irrigation networks to dispense', 64, 494, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  water up to the optimal biological saturation threshold.', 64, 482, 'F1', 8, [0.25, 0.32, 0.42]);

  p.drawRect(305, 444, 238, 250, [0.94, 0.97, 0.99], [0.80, 0.88, 0.98], 1);
  p.drawImage('img_weather', 315, 555, 218, 125);
  p.drawText('Weather: Climate & Energy Grids', 317, 540, 'F2', 10, [0.15, 0.45, 0.85]);
  p.drawText('• Correlating barometric pressure, relative humidity, and', 317, 522, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  temperature for cyclone and storm surge warnings.', 317, 510, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('• Correlating solar irradiance with photovoltaic electrical output', 317, 494, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  to balance municipal grid loads and prevent blackouts.', 317, 482, 'F1', 8, [0.25, 0.32, 0.42]);

  // Slide 14 (Bottom)
  p.drawSlideCard(36, 56, 523.28, 354, 'SLIDE 14 • APPLICATIONS', 'Applications: Business & Digital Marketing', 'Price elasticity of demand, customer acquisition, and marketing ROI');

  p.drawRect(52, 74, 238, 250, [0.99, 0.94, 0.96], [0.96, 0.82, 0.88], 1);
  p.drawImage('img_business', 62, 185, 218, 125);
  p.drawText('Commerce: Price vs Demand', 64, 170, 'F2', 10, [0.85, 0.20, 0.45]);
  p.drawText('• Demonstrates classic negative correlation: increasing unit', 64, 152, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  price leads to lower sales quantity in competitive goods.', 64, 140, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('• Enables business analysts to compute price elasticity', 64, 124, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  coefficients and establish revenue-maximizing pricing.', 64, 112, 'F1', 8, [0.25, 0.32, 0.42]);

  p.drawRect(305, 74, 238, 250, [0.96, 0.94, 0.99], [0.86, 0.80, 0.96], 1);
  p.drawImage('img_marketing', 315, 185, 218, 125);
  p.drawText('Marketing: Ad Spend vs Sales', 317, 170, 'F2', 10, [0.49, 0.36, 0.99]);
  p.drawText('• Correlating paid campaign investment with web conversions,', 317, 152, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  click-through rates (CTR), and retail transaction volumes.', 317, 140, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('• Identifies saturation thresholds where additional ad capital', 317, 124, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  yields diminishing returns, preventing wasteful marketing spend.', 317, 112, 'F1', 8, [0.25, 0.32, 0.42]);

  pdf.addPage(p.ops);
}

// ================= PAGE 8: SLIDE 15 & SLIDE 16 =================
{
  const p = new PageOps(8, 8);
  p.drawSlideCard(36, 428, 523.28, 354, 'SLIDE 15 • APPLICATIONS', 'Applications: Transport & Industrial Engineering', 'Traffic volume dynamics and Industry 4.0 predictive maintenance');

  p.drawRect(52, 444, 238, 250, [0.94, 0.97, 0.99], [0.80, 0.88, 0.98], 1);
  p.drawImage('img_transport', 62, 555, 218, 125);
  p.drawText('Smart Transit: Traffic Density', 64, 540, 'F2', 10, [0.15, 0.45, 0.85]);
  p.drawText('• Correlating urban vehicle density with commute delays', 64, 522, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  and fuel consumption across city arterial roads.', 64, 510, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('• Real-time correlation telemetry powers Google Maps and', 64, 494, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  traffic signal timing algorithms to bypass gridlocks.', 64, 482, 'F1', 8, [0.25, 0.32, 0.42]);

  p.drawRect(305, 444, 238, 250, [0.96, 0.94, 0.99], [0.86, 0.80, 0.96], 1);
  p.drawImage('img_engineer', 315, 555, 218, 125);
  p.drawText('Industry 4.0: Predictive Maintenance', 317, 540, 'F2', 10, [0.49, 0.36, 0.99]);
  p.drawText('• Correlating motor operating temperature with vibration', 317, 522, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  frequency telemetry in industrial rotating machinery.', 317, 510, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('• Simultaneous correlation spikes trigger automated alerts', 317, 494, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('  for component replacement prior to catastrophic failure.', 317, 482, 'F1', 8, [0.25, 0.32, 0.42]);

  // Slide 16 (Bottom)
  p.drawSlideCard(36, 56, 523.28, 354, 'SLIDE 16 • CONCLUSION', 'Conclusion & Academic References', 'Key takeaways, the golden statistical rule, and project team credits');

  p.drawRect(52, 232, 491, 74, [0.99, 0.93, 0.95], [0.96, 0.70, 0.80], 1.5);
  p.drawText('THE GOLDEN RULE OF STATISTICAL REASONING:', 64, 288, 'F2', 9, [0.85, 0.15, 0.35]);
  p.drawText('"CORRELATION DOES NOT IMPLY CAUSATION"', 110, 266, 'F2', 13, [0.15, 0.20, 0.29]);
  p.drawText('Just because two variables move together does NOT prove one causes the other. Both may be driven by a lurking confounding variable.', 64, 248, 'F1', 8, [0.35, 0.42, 0.52]);

  p.drawRect(52, 142, 238, 78, [0.94, 0.97, 0.99], [0.80, 0.88, 0.98], 1);
  p.drawText('Standard Academic References:', 64, 204, 'F2', 9.5, [0.15, 0.45, 0.85]);
  p.drawText('1. S.C. Gupta & V.K. Kapoor, Fundamentals of', 64, 188, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('   Mathematical Statistics, Sultan Chand & Sons.', 64, 176, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('2. Walpole, Myers, Myers & Ye, Probability &', 64, 162, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('   Statistics for Engineers and Scientists, Pearson.', 64, 150, 'F1', 8, [0.25, 0.32, 0.42]);

  p.drawRect(305, 142, 238, 78, [0.96, 0.94, 0.99], [0.86, 0.80, 0.96], 1);
  p.drawText('Project Presentation Credits:', 317, 204, 'F2', 9.5, [0.49, 0.36, 0.99]);
  p.drawText('Team Presenters: Niharika, Riya, Sukruti, Anushka', 317, 188, 'F2', 8.5, [0.15, 0.20, 0.29]);
  p.drawText('Programme: FY B.Tech CSE (Division C, 2026–27)', 317, 172, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('Bharati Vidyapeeth Deemed to be University, Pune', 317, 158, 'F2', 8, [0.49, 0.36, 0.99]);

  p.drawRect(52, 74, 491, 56, [0.97, 0.98, 0.99], [0.82, 0.88, 0.95], 1);
  p.drawText('SUMMARY & VIVA TAKEAWAYS:', 64, 114, 'F2', 8.5, [0.49, 0.36, 0.99]);
  p.drawText('1. Pearson\'s r standardizes bivariate co-movement between -1 and +1 with zero unit dependency.', 64, 100, 'F1', 8, [0.25, 0.32, 0.42]);
  p.drawText('2. Worked Examples confirmed: Study vs Marks yielded r = +0.991; Speed vs Travel Time yielded r = -0.890.', 64, 88, 'F1', 8, [0.25, 0.32, 0.42]);

  pdf.addPage(p.ops);
}

// Build the final PDF
const outputPath = 'c:/Users/HP/OneDrive/Documents/co/Correlation_Presentation_Handout_2SlidesPerPage.pdf';
pdf.buildPDF(outputPath);
