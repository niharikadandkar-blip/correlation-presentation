import { DataPoint, CorrelationStats } from '../types/presentation';

/**
 * Calculates Karl Pearson correlation coefficient and regression line parameters
 */
export function calculateCorrelation(points: { x: number; y: number }[]): CorrelationStats {
  const n = points.length;
  if (n < 2) {
    return {
      n,
      meanX: n === 1 ? points[0].x : 0,
      meanY: n === 1 ? points[0].y : 0,
      r: 0,
      slope: 0,
      intercept: 0,
      direction: 'Zero / None',
      strength: 'None',
    };
  }

  const sumX = points.reduce((acc, p) => acc + p.x, 0);
  const sumY = points.reduce((acc, p) => acc + p.y, 0);
  const meanX = sumX / n;
  const meanY = sumY / n;

  let sumDiffXY = 0;
  let sumDiffX2 = 0;
  let sumDiffY2 = 0;

  for (const p of points) {
    const dx = p.x - meanX;
    const dy = p.y - meanY;
    sumDiffXY += dx * dy;
    sumDiffX2 += dx * dx;
    sumDiffY2 += dy * dy;
  }

  const denominator = Math.sqrt(sumDiffX2 * sumDiffY2);
  let r = 0;
  if (denominator > 0.000001) {
    r = sumDiffXY / denominator;
    // Bound to [-1, 1] against numerical rounding
    r = Math.max(-1, Math.min(1, r));
  }

  let slope = 0;
  if (sumDiffX2 > 0.000001) {
    slope = sumDiffXY / sumDiffX2;
  }
  const intercept = meanY - slope * meanX;

  // Direction classification
  let direction: 'Positive' | 'Negative' | 'Zero / None' = 'Zero / None';
  if (r >= 0.08) {
    direction = 'Positive';
  } else if (r <= -0.08) {
    direction = 'Negative';
  }

  // Strength classification based on magnitude
  const absR = Math.abs(r);
  let strength: 'Strong' | 'Moderate' | 'Weak' | 'None' = 'None';
  if (absR >= 0.7) {
    strength = 'Strong';
  } else if (absR >= 0.35) {
    strength = 'Moderate';
  } else if (absR > 0.05) {
    strength = 'Weak';
  }

  return {
    n,
    meanX,
    meanY,
    r: Math.round(r * 100) / 100,
    slope: Math.round(slope * 100) / 100,
    intercept: Math.round(intercept * 100) / 100,
    direction,
    strength,
  };
}

/**
 * Standard illustrative dataset for Temperature vs Cold Drink Sales
 */
export const initialTempSalesData: DataPoint[] = [
  { id: 1, x: 20, y: 10, label: 'Cool Day (20°C, 10 units)' },
  { id: 2, x: 24, y: 15, label: 'Mild Day (24°C, 15 units)' },
  { id: 3, x: 28, y: 20, label: 'Warm Day (28°C, 20 units)' },
  { id: 4, x: 32, y: 25, label: 'Hot Day (32°C, 25 units)' },
  { id: 5, x: 36, y: 30, label: 'Very Hot Day (36°C, 30 units)' },
];

/**
 * Generates synthetic points with target correlation for visual demonstrations
 */
export function generateSyntheticPoints(targetR: number, count: number = 24, seed: number = 42): DataPoint[] {
  // Simple deterministic pseudorandom generator based on seed
  let s = seed;
  const pseudoRandom = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const points: DataPoint[] = [];
  const minX = 10;
  const maxX = 90;

  for (let i = 0; i < count; i++) {
    // Generate normalized x in [-1, 1]
    const u1 = pseudoRandom();
    const u2 = pseudoRandom();
    // Box-Muller normal distribution
    const z1 = Math.sqrt(-2.0 * Math.log(u1 || 0.0001)) * Math.cos(2.0 * Math.PI * u2);
    const z2 = Math.sqrt(-2.0 * Math.log(pseudoRandom() || 0.0001)) * Math.cos(2.0 * Math.PI * pseudoRandom());

    // Construct correlated normal variables
    const xNorm = z1;
    const yNorm = targetR * z1 + Math.sqrt(Math.max(0, 1 - targetR * targetR)) * z2;

    // Scale to range [15, 85]
    const x = Math.max(12, Math.min(88, Math.round(50 + xNorm * 14)));
    const y = Math.max(12, Math.min(88, Math.round(50 + yNorm * 14)));

    points.push({
      id: i + 1,
      x,
      y,
      label: `Obs #${i + 1} (X: ${x}, Y: ${y})`
    });
  }

  // Sort by x for clean rendering
  return points.sort((a, b) => a.x - b.x);
}

/**
 * Generates a purely random zero-correlation scatter
 */
export function generateZeroCorrelationPoints(count: number = 20, seedOffset: number = 0): DataPoint[] {
  const points: DataPoint[] = [];
  let s = 100 + seedOffset * 77;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };

  for (let i = 0; i < count; i++) {
    const shoeSize = Math.round(6 + rnd() * 6); // 6 to 12
    const rainfall = Math.round(20 + rnd() * 100); // 20 to 120 mm
    points.push({
      id: i + 1,
      x: shoeSize,
      y: rainfall,
      label: `Student #${i + 1}: Shoe ${shoeSize}, Rain ${rainfall}mm`,
    });
  }
  return points;
}

