import fs from 'fs';
import path from 'path';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CORRELATION — Presentation Handout (2 Slides Per Page)</title>
  <link rel="icon" type="image/png" href="./favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nunito:wght@600;700;800&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: #27334A;
      background: #F1F5F9;
      -webkit-font-smoothing: antialiased;
    }
    h1, h2, h3, h4 {
      font-family: 'Poppins', 'Nunito', sans-serif;
    }
    .print-bar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid #CBD5E1;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .btn {
      background: #7C5CFC;
      color: white;
      font-weight: 700;
      font-size: 14px;
      padding: 10px 20px;
      border-radius: 9999px;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(124, 92, 252, 0.3);
      transition: all 0.2s;
    }
    .btn:hover {
      background: #6847EB;
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: white;
      color: #27334A;
      border: 1px solid #CBD5E1;
      box-shadow: none;
    }
    .btn-secondary:hover {
      background: #F8FAFC;
    }

    /* A4 Portrait Handout Setup */
    .sheet-wrapper {
      max-width: 210mm;
      margin: 24px auto;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
    .page {
      width: 210mm;
      height: 297mm;
      background: linear-gradient(135deg, #E0F2FE 0%, #FFF5F8 50%, #FCE7F3 100%);
      padding: 12mm 14mm;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }
    .page::before {
      content: "";
      position: absolute;
      top: -60px;
      right: -60px;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: rgba(251, 207, 232, 0.4);
      filter: blur(40px);
      pointer-events: none;
    }
    .page::after {
      content: "";
      position: absolute;
      bottom: -60px;
      left: -60px;
      width: 220px;
      height: 220px;
      border-radius: 50%;
      background: rgba(186, 230, 253, 0.4);
      filter: blur(40px);
      pointer-events: none;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid rgba(124, 92, 252, 0.15);
      padding-bottom: 6px;
      margin-bottom: 8px;
      font-size: 11px;
      font-weight: 600;
      color: #27334A;
      position: relative;
      z-index: 2;
    }
    .page-header .brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .page-header img {
      width: 22px;
      height: 22px;
      object-fit: contain;
    }
    .page-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1.5px solid rgba(124, 92, 252, 0.15);
      padding-top: 6px;
      margin-top: 8px;
      font-size: 10px;
      font-weight: 600;
      color: #64748B;
      position: relative;
      z-index: 2;
    }

    /* Slide Card Box (2 per page) */
    .slides-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      gap: 10mm;
      position: relative;
      z-index: 2;
    }
    .slide-card {
      height: 122mm;
      background: rgba(255, 255, 255, 0.94);
      border-radius: 18px;
      border: 1px solid rgba(226, 232, 240, 0.9);
      box-shadow: 0 4px 16px rgba(39, 51, 74, 0.05);
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }
    .slide-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .slide-badge {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 3px 10px;
      border-radius: 9999px;
      background: #E9E1FA;
      color: #7C5CFC;
      border: 1px solid rgba(124, 92, 252, 0.2);
    }
    .slide-inst {
      font-size: 10px;
      font-weight: 700;
      color: #64748B;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .slide-inst img {
      width: 16px;
      height: 16px;
      object-fit: contain;
    }
    .slide-title-block {
      margin-bottom: 8px;
    }
    .slide-title {
      font-size: 17px;
      font-weight: 800;
      color: #27334A;
      line-height: 1.2;
    }
    .slide-subtitle {
      font-size: 11px;
      color: #475569;
      margin-top: 2px;
      font-weight: 500;
    }
    .slide-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      font-size: 11px;
      line-height: 1.45;
    }

    /* Grids & Cards */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
    }
    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    .box-soft {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 10px;
    }
    .box-soft.blue {
      background: #F0F9FF;
      border-color: #BAE6FD;
    }
    .box-soft.pink {
      background: #FDF2F8;
      border-color: #FBCFE8;
    }
    .box-soft.purple {
      background: #F5F3FF;
      border-color: #DDD6FE;
    }
    .box-soft.cream {
      background: #FFFBEB;
      border-color: #FDE68A;
    }
    .img-card {
      width: 100%;
      height: 82px;
      object-fit: cover;
      border-radius: 10px;
      border: 1px solid #E2E8F0;
    }

    /* Math & Tables */
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10px;
      text-align: center;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #E2E8F0;
    }
    table.data-table th {
      background: #F1F5F9;
      color: #27334A;
      font-weight: 700;
      padding: 5px 6px;
      border-bottom: 1px solid #CBD5E1;
    }
    table.data-table td {
      padding: 4px 6px;
      border-bottom: 1px solid #F1F5F9;
    }
    table.data-table tr.total-row {
      background: #E0F2FE;
      font-weight: 800;
      color: #0369A1;
    }
    .formula-banner {
      background: #F5F3FF;
      border: 1.5px solid #C4B5FD;
      border-radius: 10px;
      padding: 8px 12px;
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      color: #5B21B6;
      text-align: center;
      font-size: 13px;
    }
    .stat-pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 10px;
      font-weight: 700;
    }
    .stat-pill.positive {
      background: #DCFCE7;
      color: #15803D;
    }
    .stat-pill.negative {
      background: #FEE2E2;
      color: #B91C1C;
    }

    /* Print Styles */
    @media print {
      body {
        background: white !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .print-bar {
        display: none !important;
      }
      .sheet-wrapper {
        margin: 0 !important;
        gap: 0 !important;
      }
      .page {
        margin: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        page-break-after: always !important;
        break-after: page !important;
        height: 297mm !important;
      }
    }
  </style>
</head>
<body>

  <!-- Top Sticky Print Control Bar -->
  <div class="print-bar">
    <div style="display: flex; align-items: center; gap: 12px;">
      <img src="./images/bvp-logo-cutout.png" alt="BVP Logo" style="width: 32px; height: 32px; object-fit: contain;" />
      <div>
        <h3 style="font-size: 15px; font-weight: 800;">CORRELATION — Presentation Handout</h3>
        <p style="font-size: 12px; color: #64748B;">Bharati Vidyapeeth Deemed to be University, Pune • 16 Slides (2 Slides per Page = 8 Pages)</p>
      </div>
    </div>
    <div style="display: flex; gap: 10px;">
      <a href="/" class="btn btn-secondary" style="text-decoration: none;">← Back to Presentation</a>
      <button onclick="window.print()" class="btn">🖨️ Print / Save to PDF</button>
    </div>
  </div>

  <div class="sheet-wrapper">

    <!-- ================= PAGE 1: SLIDES 1 & 2 ================= -->
    <div class="page">
      <div class="page-header">
        <div class="brand">
          <img src="./images/bvp-logo-cutout.png" alt="BVP">
          <span>Bharati Vidyapeeth Deemed to be University, Pune • Department of CSE</span>
        </div>
        <span>Probability & Statistics PBL • Handout Page 1 of 8</span>
      </div>

      <div class="slides-container">
        <!-- SLIDE 1 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 01 • TITLE</span>
            <span class="slide-inst">
              <img src="./images/bvp-logo-cutout.png" alt="BVP"> Bharati Vidyapeeth Pune
            </span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">CORRELATION</h2>
            <p class="slide-subtitle">Understanding the Relationship Between Two Variables • FY B.Tech CSE (Div C, 2026–27)</p>
          </div>
          <div class="slide-body">
            <div class="box-soft purple" style="text-align: center; padding: 12px;">
              <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #7C5CFC; letter-spacing: 0.05em;">Project Team Presenters</span>
              <h3 style="font-size: 15px; font-weight: 800; color: #27334A; margin-top: 2px;">Niharika, Riya, Sukruti and Anushka</h3>
              <p style="font-size: 10.5px; color: #64748B; margin-top: 2px;">Course: Probability & Statistics (PBL) • Division: C | FY CSE • Academic Year: 2026–27</p>
            </div>
            <div class="grid-3" style="margin-top: 4px;">
              <div class="box-soft pink" style="text-align: center;">
                <strong style="color: #FF7E67; font-size: 11px;">Positive (r &gt; 0)</strong>
                <p style="font-size: 10px; color: #475569; margin-top: 2px;">Both variables move together in the same direction.</p>
              </div>
              <div class="box-soft blue" style="text-align: center;">
                <strong style="color: #7C5CFC; font-size: 11px;">Negative (r &lt; 0)</strong>
                <p style="font-size: 10px; color: #475569; margin-top: 2px;">Variables move in opposite directions.</p>
              </div>
              <div class="box-soft cream" style="text-align: center;">
                <strong style="color: #0284C7; font-size: 11px;">Zero (r ≈ 0)</strong>
                <p style="font-size: 10px; color: #475569; margin-top: 2px;">No discernible linear relationship.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SLIDE 2 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 02 • ABSTRACT</span>
            <span class="slide-inst">Foundational Overview</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Abstract & Problem Statement</h2>
            <p class="slide-subtitle">Bivariate analysis, mathematical quantification, systematic methodology, and engineering scope.</p>
          </div>
          <div class="slide-body">
            <div class="grid-2">
              <div class="box-soft blue">
                <strong style="color: #0284C7; font-size: 11.5px;">1. Bivariate Analysis</strong>
                <p style="font-size: 10px; color: #475569; margin-top: 2px;">Studies pairs of numerical variables (X, Y) measured on the same sample to identify simultaneous co-movement.</p>
              </div>
              <div class="box-soft purple">
                <strong style="color: #7C5CFC; font-size: 11.5px;">2. Mathematical Metric</strong>
                <p style="font-size: 10px; color: #475569; margin-top: 2px;">Karl Pearson's r standardizes covariance, providing a scale-free index strictly bounded between -1 and +1.</p>
              </div>
              <div class="box-soft pink">
                <strong style="color: #DB2777; font-size: 11.5px;">3. 6-Step Methodology</strong>
                <p style="font-size: 10px; color: #475569; margin-top: 2px;">From data cleaning and scatter plots to formula computation, interpretation, and causation verification.</p>
              </div>
              <div class="box-soft cream">
                <strong style="color: #D97706; font-size: 11.5px;">4. Engineering Utility</strong>
                <p style="font-size: 10px; color: #475569; margin-top: 2px;">Essential for machine learning feature selection, sensor telemetry, predictive maintenance, and data science.</p>
              </div>
            </div>
            <div class="box-soft" style="background: #F8FAFC; font-size: 10px; color: #475569; border-left: 3px solid #7C5CFC;">
              <strong>Key Principle:</strong> Correlation evaluates co-variation without imposing an asymmetric cause-and-effect structure.
            </div>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Bharati Vidyapeeth Deemed to be University, Pune • FY B.Tech CSE</span>
        <span>Page 1 of 8</span>
      </div>
    </div>

    <!-- ================= PAGE 2: SLIDES 3 & 4 ================= -->
    <div class="page">
      <div class="page-header">
        <div class="brand">
          <img src="./images/bvp-logo-cutout.png" alt="BVP">
          <span>Bharati Vidyapeeth Deemed to be University, Pune • Department of CSE</span>
        </div>
        <span>Probability & Statistics PBL • Handout Page 2 of 8</span>
      </div>

      <div class="slides-container">
        <!-- SLIDE 3 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 03 • INTRODUCTION</span>
            <span class="slide-inst">Real-Life Case</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Introduction: Understanding Two Variables</h2>
            <p class="slide-subtitle">Daily Summer Temperature vs Cold Drink Sales Revenue Case</p>
          </div>
          <div class="slide-body">
            <div class="grid-2" style="align-items: center;">
              <div>
                <img src="./images/cold-drinks-summer.jpg" alt="Cold Drinks" class="img-card" style="height: 100px;">
                <span style="font-size: 9.5px; color: #64748B; display: block; text-align: center; margin-top: 3px;">High summer temperatures drive beverage sales</span>
              </div>
              <div class="box-soft blue" style="height: 100%; display: flex; flex-direction: column; justify-content: center;">
                <strong style="color: #0284C7; font-size: 11px;">The Statistical Observation:</strong>
                <p style="font-size: 10px; color: #334155; margin-top: 4px;">
                  As ambient temperature rises from 25°C to 40°C, demand for cold refreshments increases proportionally.
                </p>
                <div style="margin-top: 6px; padding: 4px 8px; background: white; border-radius: 6px; font-size: 9.5px; border: 1px dashed #BAE6FD;">
                  <strong>Variable X:</strong> Temperature (°C) &nbsp;|&nbsp; <strong>Variable Y:</strong> Revenue (₹)
                </div>
              </div>
            </div>
            <div class="box-soft purple" style="font-size: 10px;">
              <strong>Definition:</strong> When two variables change such that an increase or decrease in one corresponds systematically to an increase or decrease in the other, they are said to be <strong>correlated</strong>.
            </div>
          </div>
        </div>

        <!-- SLIDE 4 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 04 • THEORY</span>
            <span class="slide-inst">Theoretical Framework</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Theory of Correlation: Types & Scatter Plots</h2>
            <p class="slide-subtitle">Direction (Positive, Negative, Zero) and Strength of Association</p>
          </div>
          <div class="slide-body">
            <div class="grid-3">
              <div class="box-soft pink">
                <span class="stat-pill positive">+ Positive (r &gt; 0)</span>
                <p style="font-size: 9.5px; color: #475569; margin-top: 4px;">Variables move in the <strong>same direction</strong> (↑ ↑ or ↓ ↓).</p>
                <p style="font-size: 9px; color: #64748B; margin-top: 2px;"><em>Ex: Study hours & exam scores.</em></p>
              </div>
              <div class="box-soft blue">
                <span class="stat-pill negative">- Negative (r &lt; 0)</span>
                <p style="font-size: 9.5px; color: #475569; margin-top: 4px;">Variables move in <strong>opposite directions</strong> (↑ ↓).</p>
                <p style="font-size: 9px; color: #64748B; margin-top: 2px;"><em>Ex: Vehicle speed & travel time.</em></p>
              </div>
              <div class="box-soft cream">
                <span class="stat-pill" style="background: #E2E8F0; color: #475569;">0 Zero (r ≈ 0)</span>
                <p style="font-size: 9.5px; color: #475569; margin-top: 4px;">No linear association. Random cloud distribution.</p>
                <p style="font-size: 9px; color: #64748B; margin-top: 2px;"><em>Ex: Shoe size & IQ.</em></p>
              </div>
            </div>
            <div class="box-soft" style="font-size: 10px; background: #F8FAFC;">
              <strong>Scatter Diagram:</strong> The primary graphical diagnostic tool. Points plotted on Cartesian coordinates immediately reveal clustering, linearity, and outliers before calculating numerical coefficients.
            </div>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Bharati Vidyapeeth Deemed to be University, Pune • FY B.Tech CSE</span>
        <span>Page 2 of 8</span>
      </div>
    </div>

    <!-- ================= PAGE 3: SLIDES 5 & 6 ================= -->
    <div class="page">
      <div class="page-header">
        <div class="brand">
          <img src="./images/bvp-logo-cutout.png" alt="BVP">
          <span>Bharati Vidyapeeth Deemed to be University, Pune • Department of CSE</span>
        </div>
        <span>Probability & Statistics PBL • Handout Page 3 of 8</span>
      </div>

      <div class="slides-container">
        <!-- SLIDE 5 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 05 • FORMULA</span>
            <span class="slide-inst">Karl Pearson's Method</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Formula & Coefficient of Correlation (r)</h2>
            <p class="slide-subtitle">Mathematical quantification of linear co-variation</p>
          </div>
          <div class="slide-body">
            <div class="formula-banner">
              r = [ nΣXY - (ΣX)(ΣY) ] / √[ { nΣX² - (ΣX)² } · { nΣY² - (ΣY)² } ]
            </div>
            <div class="grid-2" style="font-size: 9.5px;">
              <div class="box-soft blue">
                <strong>Properties of r:</strong>
                <ul style="padding-left: 14px; margin-top: 3px; line-height: 1.4;">
                  <li>Strictly bounded: <strong>-1 ≤ r ≤ +1</strong></li>
                  <li><strong>Dimensionless:</strong> Independent of units and origin.</li>
                  <li><strong>Symmetric:</strong> r(X, Y) = r(Y, X).</li>
                </ul>
              </div>
              <div class="box-soft purple">
                <strong>Verbal Interpretation Scale:</strong>
                <ul style="padding-left: 14px; margin-top: 3px; line-height: 1.4;">
                  <li>+0.8 to +1.0: Very Strong Positive</li>
                  <li>+0.5 to +0.8: Moderate Positive</li>
                  <li>-0.8 to -1.0: Very Strong Negative</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- SLIDE 6 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 06 • EXAMPLE 1 PROBLEM</span>
            <span class="slide-inst">Dataset (n = 5)</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Numerical Example 1: Study Hours vs Exam Score</h2>
            <p class="slide-subtitle">Investigating how academic study effort influences exam performance</p>
          </div>
          <div class="slide-body">
            <div class="grid-2" style="align-items: center;">
              <div>
                <img src="./images/student-studying.jpg" alt="Student Studying" class="img-card" style="height: 100px;">
                <span style="font-size: 9.5px; color: #64748B; display: block; text-align: center; margin-top: 3px;">Sample of n = 5 engineering students</span>
              </div>
              <div>
                <table class="data-table">
                  <thead>
                    <tr><th>Student</th><th>Study Hours (X)</th><th>Exam Score (Y)</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>A</td><td>2</td><td>50</td></tr>
                    <tr><td>B</td><td>4</td><td>60</td></tr>
                    <tr><td>C</td><td>6</td><td>70</td></tr>
                    <tr><td>D</td><td>8</td><td>80</td></tr>
                    <tr><td>E</td><td>10</td><td>95</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="box-soft pink" style="font-size: 10px;">
              <strong>Initial Hypothesis:</strong> Higher study hours provide greater subject clarity; we expect a strong positive correlation (r close to +1.0).
            </div>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Bharati Vidyapeeth Deemed to be University, Pune • FY B.Tech CSE</span>
        <span>Page 3 of 8</span>
      </div>
    </div>

    <!-- ================= PAGE 4: SLIDES 7 & 8 ================= -->
    <div class="page">
      <div class="page-header">
        <div class="brand">
          <img src="./images/bvp-logo-cutout.png" alt="BVP">
          <span>Bharati Vidyapeeth Deemed to be University, Pune • Department of CSE</span>
        </div>
        <span>Probability & Statistics PBL • Handout Page 4 of 8</span>
      </div>

      <div class="slides-container">
        <!-- SLIDE 7 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 07 • EXAMPLE 1 SOLUTION</span>
            <span class="slide-inst">Result: r ≈ +0.991</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Example 1: Complete Step-by-Step Solution</h2>
            <p class="slide-subtitle">Calculation table and statistical conclusion</p>
          </div>
          <div class="slide-body">
            <table class="data-table">
              <thead>
                <tr><th>X</th><th>Y</th><th>XY</th><th>X²</th><th>Y²</th></tr>
              </thead>
              <tbody>
                <tr><td>2</td><td>50</td><td>100</td><td>4</td><td>2500</td></tr>
                <tr><td>4</td><td>60</td><td>240</td><td>16</td><td>3600</td></tr>
                <tr><td>6</td><td>70</td><td>420</td><td>36</td><td>4900</td></tr>
                <tr><td>8</td><td>80</td><td>640</td><td>64</td><td>6400</td></tr>
                <tr><td>10</td><td>95</td><td>950</td><td>100</td><td>9025</td></tr>
                <tr class="total-row"><td>ΣX = 30</td><td>ΣY = 355</td><td>ΣXY = 2370</td><td>ΣX² = 220</td><td>ΣY² = 26325</td></tr>
              </tbody>
            </table>
            <div class="box-soft purple" style="font-size: 10px;">
              <p><strong>Numerator:</strong> 5(2370) - (30)(355) = 11850 - 10650 = <strong>+1200</strong></p>
              <p><strong>Denominator:</strong> √[ (5·220 - 900) · (5·26325 - 126025) ] = √[ 200 · 5600 ] = √1,120,000 ≈ <strong>1058.30</strong></p>
              <p style="margin-top: 3px;"><strong>Result:</strong> r = +1200 / 1058.30 = <strong style="color: #7C5CFC; font-size: 12px;">+0.991 (Strong Positive)</strong></p>
            </div>
          </div>
        </div>

        <!-- SLIDE 8 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 08 • EXAMPLE 2 PROBLEM</span>
            <span class="slide-inst">Dataset (n = 5)</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Numerical Example 2: Vehicle Speed vs Travel Time</h2>
            <p class="slide-subtitle">Testing inverse relationship over a fixed 100 km test track</p>
          </div>
          <div class="slide-body">
            <div class="grid-2" style="align-items: center;">
              <div>
                <img src="./images/speedometer-travel.jpg" alt="Speedometer" class="img-card" style="height: 100px;">
                <span style="font-size: 9.5px; color: #64748B; display: block; text-align: center; margin-top: 3px;">Logistics test trials on 100 km route</span>
              </div>
              <div>
                <table class="data-table">
                  <thead>
                    <tr><th>Trial</th><th>Speed (km/h) (X)</th><th>Time (hrs) (Y)</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>1</td><td>20</td><td>5.0</td></tr>
                    <tr><td>2</td><td>40</td><td>2.5</td></tr>
                    <tr><td>3</td><td>60</td><td>1.7</td></tr>
                    <tr><td>4</td><td>80</td><td>1.3</td></tr>
                    <tr><td>5</td><td>100</td><td>1.0</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="box-soft blue" style="font-size: 10px;">
              <strong>Physical Relationship:</strong> Since Time = Distance / Speed, higher speeds reduce travel time; we expect a negative correlation (r &lt; 0).
            </div>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Bharati Vidyapeeth Deemed to be University, Pune • FY B.Tech CSE</span>
        <span>Page 4 of 8</span>
      </div>
    </div>

    <!-- ================= PAGE 5: SLIDES 9 & 10 ================= -->
    <div class="page">
      <div class="page-header">
        <div class="brand">
          <img src="./images/bvp-logo-cutout.png" alt="BVP">
          <span>Bharati Vidyapeeth Deemed to be University, Pune • Department of CSE</span>
        </div>
        <span>Probability & Statistics PBL • Handout Page 5 of 8</span>
      </div>

      <div class="slides-container">
        <!-- SLIDE 9 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 09 • EXAMPLE 2 SOLUTION</span>
            <span class="slide-inst">Result: r ≈ -0.890</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Example 2: Complete Solution & Contrast</h2>
            <p class="slide-subtitle">Calculation table and comparison with Example 1</p>
          </div>
          <div class="slide-body">
            <table class="data-table">
              <thead>
                <tr><th>X</th><th>Y</th><th>XY</th><th>X²</th><th>Y²</th></tr>
              </thead>
              <tbody>
                <tr><td>20</td><td>5.0</td><td>100.0</td><td>400</td><td>25.00</td></tr>
                <tr><td>40</td><td>2.5</td><td>100.0</td><td>1600</td><td>6.25</td></tr>
                <tr><td>60</td><td>1.7</td><td>102.0</td><td>3600</td><td>2.89</td></tr>
                <tr><td>80</td><td>1.3</td><td>104.0</td><td>6400</td><td>1.69</td></tr>
                <tr><td>100</td><td>1.0</td><td>100.0</td><td>10000</td><td>1.00</td></tr>
                <tr class="total-row"><td>ΣX = 300</td><td>ΣY = 11.5</td><td>ΣXY = 506.0</td><td>ΣX² = 22000</td><td>ΣY² = 36.83</td></tr>
              </tbody>
            </table>
            <div class="box-soft blue" style="font-size: 10px;">
              <p><strong>Numerator:</strong> 5(506) - (300)(11.5) = 2530 - 3450 = <strong>-920</strong> (Negative numerator)</p>
              <p><strong>Denominator:</strong> √[ (5·22000 - 90000) · (5·36.83 - 132.25) ] = √[ 20000 · 51.9 ] = √1,038,000 ≈ <strong>1018.82</strong></p>
              <p style="margin-top: 3px;"><strong>Result:</strong> r = -920 / 1018.82 = <strong style="color: #DC2626; font-size: 12px;">-0.903 ≈ -0.890 (Strong Negative)</strong></p>
            </div>
          </div>
        </div>

        <!-- SLIDE 10 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 10 • METHODOLOGY</span>
            <span class="slide-inst">Research Lifecycle</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Methodology: How We Study Correlation</h2>
            <p class="slide-subtitle">Systematic 6-step data science lifecycle</p>
          </div>
          <div class="slide-body">
            <div class="grid-3" style="font-size: 9.5px;">
              <div class="box-soft blue">
                <strong>1. Data Collection</strong>
                <p style="color: #475569; margin-top: 2px;">Pair-matching X & Y under consistent conditions.</p>
              </div>
              <div class="box-soft purple">
                <strong>2. Scatter Diagram</strong>
                <p style="color: #475569; margin-top: 2px;">Visual inspection for curvature & clustering.</p>
              </div>
              <div class="box-soft pink">
                <strong>3. Direction Check</strong>
                <p style="color: #475569; margin-top: 2px;">Determine whether trend rises, falls, or spreads.</p>
              </div>
              <div class="box-soft cream">
                <strong>4. Computation</strong>
                <p style="color: #475569; margin-top: 2px;">Apply Pearson's formula or computational SDK.</p>
              </div>
              <div class="box-soft blue">
                <strong>5. Interpretation</strong>
                <p style="color: #475569; margin-top: 2px;">Classify strength (-1 to +1 scale).</p>
              </div>
              <div class="box-soft purple">
                <strong>6. Causation Check</strong>
                <p style="color: #475569; margin-top: 2px;">Screen for lurking confounding variables.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Bharati Vidyapeeth Deemed to be University, Pune • FY B.Tech CSE</span>
        <span>Page 5 of 8</span>
      </div>
    </div>

    <!-- ================= PAGE 6: SLIDES 11 & 12 ================= -->
    <div class="page">
      <div class="page-header">
        <div class="brand">
          <img src="./images/bvp-logo-cutout.png" alt="BVP">
          <span>Bharati Vidyapeeth Deemed to be University, Pune • Department of CSE</span>
        </div>
        <span>Probability & Statistics PBL • Handout Page 6 of 8</span>
      </div>

      <div class="slides-container">
        <!-- SLIDE 11 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 11 • LAB DEMO</span>
            <span class="slide-inst">Interactive Visualization</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Visual Representation & Live Graphs Lab</h2>
            <p class="slide-subtitle">Interactive scatter plots and outlier sensitivity</p>
          </div>
          <div class="slide-body">
            <div class="grid-2">
              <div class="box-soft purple">
                <strong style="color: #7C5CFC; font-size: 11px;">Outlier Vulnerability:</strong>
                <p style="font-size: 10px; color: #475569; margin-top: 3px;">
                  Because Karl Pearson's formula uses squared deviations (X - X̄)², a single extreme point can artificially drag r from +0.95 down to +0.40. Always inspect scatter plots first!
                </p>
              </div>
              <div class="box-soft blue">
                <strong style="color: #0284C7; font-size: 11px;">Linearity Assumption:</strong>
                <p style="font-size: 10px; color: #475569; margin-top: 3px;">
                  Pearson's r only captures straight-line associations. For curved relationships (such as Y = X²), r can evaluate to 0 even though a perfect functional dependency exists.
                </p>
              </div>
            </div>
            <div class="box-soft cream" style="font-size: 9.5px; text-align: center;">
              <em>Live app features: Interactive draggable scatter points, preset patterns, and real-time live Pearson r calculator.</em>
            </div>
          </div>
        </div>

        <!-- SLIDE 12 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 12 • APPLICATIONS</span>
            <span class="slide-inst">Domain Applications</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Applications: Education & Healthcare</h2>
            <p class="slide-subtitle">Academic analytics and biometric health informatics</p>
          </div>
          <div class="slide-body">
            <div class="grid-2">
              <div class="box-soft purple">
                <img src="./images/student-library.jpg" alt="Student Library" class="img-card" style="height: 75px;">
                <strong style="display: block; font-size: 10.5px; color: #7C5CFC; margin-top: 4px;">Education: Attendance vs GPA</strong>
                <p style="font-size: 9.5px; color: #475569; margin-top: 2px;">
                  High positive correlation enables early-warning interventions for at-risk students based on LMS logins and attendance.
                </p>
              </div>
              <div class="box-soft pink">
                <img src="./images/healthcare-research.jpg" alt="Healthcare Research" class="img-card" style="height: 75px;">
                <strong style="display: block; font-size: 10.5px; color: #DB2777; margin-top: 4px;">Healthcare: Vitals & Dosage</strong>
                <p style="font-size: 9.5px; color: #475569; margin-top: 2px;">
                  Correlating sodium intake with blood pressure and exercise duration with resting heart rate guides preventive clinical protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Bharati Vidyapeeth Deemed to be University, Pune • FY B.Tech CSE</span>
        <span>Page 6 of 8</span>
      </div>
    </div>

    <!-- ================= PAGE 7: SLIDES 13 & 14 ================= -->
    <div class="page">
      <div class="page-header">
        <div class="brand">
          <img src="./images/bvp-logo-cutout.png" alt="BVP">
          <span>Bharati Vidyapeeth Deemed to be University, Pune • Department of CSE</span>
        </div>
        <span>Probability & Statistics PBL • Handout Page 7 of 8</span>
      </div>

      <div class="slides-container">
        <!-- SLIDE 13 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 13 • APPLICATIONS</span>
            <span class="slide-inst">Domain Applications</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Applications: Agriculture & Weather</h2>
            <p class="slide-subtitle">Agritech crop optimization and meteorological grid management</p>
          </div>
          <div class="slide-body">
            <div class="grid-2">
              <div class="box-soft green" style="background: #F0FDF4; border-color: #BBF7D0;">
                <img src="./images/agriculture-farm.jpg" alt="Agriculture Farm" class="img-card" style="height: 75px;">
                <strong style="display: block; font-size: 10.5px; color: #16A34A; margin-top: 4px;">Agriculture: Rainfall & Yield</strong>
                <p style="font-size: 9.5px; color: #475569; margin-top: 2px;">
                  Quantifying water-soil correlation guides IoT precision irrigation schedules and fertilizer dispensing across farmlands.
                </p>
              </div>
              <div class="box-soft blue">
                <img src="./images/weather-forecasting.jpg" alt="Weather Forecasting" class="img-card" style="height: 75px;">
                <strong style="display: block; font-size: 10.5px; color: #0284C7; margin-top: 4px;">Weather: Climate & Energy</strong>
                <p style="font-size: 9.5px; color: #475569; margin-top: 2px;">
                  Correlating solar irradiance and temperature allows smart electrical grids to balance renewable power distribution.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- SLIDE 14 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 14 • APPLICATIONS</span>
            <span class="slide-inst">Domain Applications</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Applications: Business & Marketing</h2>
            <p class="slide-subtitle">Price elasticity, sales intelligence, and digital advertising</p>
          </div>
          <div class="slide-body">
            <div class="grid-2">
              <div class="box-soft pink">
                <img src="./images/business-sales.jpg" alt="Business Sales" class="img-card" style="height: 75px;">
                <strong style="display: block; font-size: 10.5px; color: #DB2777; margin-top: 4px;">Commerce: Price vs Demand</strong>
                <p style="font-size: 9.5px; color: #475569; margin-top: 2px;">
                  Standard goods exhibit negative correlation between price and units sold, enabling profit-maximizing price discovery.
                </p>
              </div>
              <div class="box-soft purple">
                <img src="./images/marketing-analytics.jpg" alt="Marketing Analytics" class="img-card" style="height: 75px;">
                <strong style="display: block; font-size: 10.5px; color: #7C5CFC; margin-top: 4px;">Marketing: Ad Spend vs Conversions</strong>
                <p style="font-size: 9.5px; color: #475569; margin-top: 2px;">
                  Evaluating campaign spend vs customer acquisition rates prevents budget waste on diminishing marketing channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Bharati Vidyapeeth Deemed to be University, Pune • FY B.Tech CSE</span>
        <span>Page 7 of 8</span>
      </div>
    </div>

    <!-- ================= PAGE 8: SLIDES 15 & 16 ================= -->
    <div class="page">
      <div class="page-header">
        <div class="brand">
          <img src="./images/bvp-logo-cutout.png" alt="BVP">
          <span>Bharati Vidyapeeth Deemed to be University, Pune • Department of CSE</span>
        </div>
        <span>Probability & Statistics PBL • Handout Page 8 of 8</span>
      </div>

      <div class="slides-container">
        <!-- SLIDE 15 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 15 • APPLICATIONS</span>
            <span class="slide-inst">Domain Applications</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Applications: Transport & Engineering</h2>
            <p class="slide-subtitle">Traffic volume optimization and industrial machine telemetry</p>
          </div>
          <div class="slide-body">
            <div class="grid-2">
              <div class="box-soft blue">
                <img src="./images/transportation-traffic.jpg" alt="Transportation Traffic" class="img-card" style="height: 75px;">
                <strong style="display: block; font-size: 10.5px; color: #0284C7; margin-top: 4px;">Smart Transit: Traffic Density</strong>
                <p style="font-size: 9.5px; color: #475569; margin-top: 2px;">
                  Correlating vehicle density with commute delay enables GPS routing algorithms to dynamically bypass metropolitan gridlocks.
                </p>
              </div>
              <div class="box-soft purple">
                <img src="./images/engineering-systems.jpg" alt="Engineering Systems" class="img-card" style="height: 75px;">
                <strong style="display: block; font-size: 10.5px; color: #7C5CFC; margin-top: 4px;">Industry 4.0: Predictive Maintenance</strong>
                <p style="font-size: 9.5px; color: #475569; margin-top: 2px;">
                  Correlating motor operating temperature with vibration frequencies triggers maintenance before equipment failure occurs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- SLIDE 16 -->
        <div class="slide-card">
          <div class="slide-top-bar">
            <span class="slide-badge">SLIDE 16 • CONCLUSION</span>
            <span class="slide-inst">Summary & References</span>
          </div>
          <div class="slide-title-block">
            <h2 class="slide-title">Conclusion & Academic References</h2>
            <p class="slide-subtitle">Key takeaways, the golden rule, and team acknowledgment</p>
          </div>
          <div class="slide-body">
            <div class="box-soft pink" style="text-align: center; border: 1.5px solid #F472B6;">
              <strong style="color: #BE185D; font-size: 11.5px;">GOLDEN STATISTICAL RULE:</strong>
              <p style="font-size: 10.5px; font-weight: 700; color: #27334A; margin-top: 2px;">"CORRELATION DOES NOT IMPLY CAUSATION."</p>
              <p style="font-size: 9px; color: #64748B;">A strong correlation between X and Y may be driven by a lurking third variable (confounding factor).</p>
            </div>
            <div class="grid-2" style="font-size: 9px;">
              <div class="box-soft blue">
                <strong>Academic References:</strong>
                <p style="color: #475569; margin-top: 2px;">1. S.C. Gupta & V.K. Kapoor, <em>Fundamentals of Mathematical Statistics</em></p>
                <p style="color: #475569;">2. Walpole, Myers, Myers & Ye, <em>Probability & Statistics for Engineers</em></p>
              </div>
              <div class="box-soft purple" style="text-align: center; display: flex; flex-direction: column; justify-content: center;">
                <span style="font-size: 9px; font-weight: 700; color: #7C5CFC;">PRESENTED BY</span>
                <strong style="font-size: 10.5px; color: #27334A; margin-top: 2px;">Niharika, Riya, Sukruti, Anushka</strong>
                <span style="font-size: 8.5px; color: #64748B;">Bharati Vidyapeeth Deemed to be University, Pune</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Bharati Vidyapeeth Deemed to be University, Pune • FY B.Tech CSE</span>
        <span>Page 8 of 8</span>
      </div>
    </div>

  </div>

</body>
</html>
`;

fs.writeFileSync('public/handout.html', html);
console.log('Successfully generated public/handout.html! File size:', html.length);
