export interface DataPoint {
  id: number;
  x: number;
  y: number;
  label?: string;
}

export type TransitionType = 'slide-horizontal' | 'fade-zoom' | 'vertical-reveal' | 'stagger-in' | 'soft-morph';

export interface SlideMeta {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  transitionType: TransitionType;
}

export interface CorrelationStats {
  n: number;
  meanX: number;
  meanY: number;
  r: number;
  slope: number;
  intercept: number;
  direction: 'Positive' | 'Negative' | 'Zero / None';
  strength: 'Strong' | 'Moderate' | 'Weak' | 'None';
}

