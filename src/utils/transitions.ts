import { Variants } from 'framer-motion';

/**
 * Slide transition variants mapped by slide index / transition type
 */
export const slideVariants: Record<string, (direction: number) => Variants> = {
  'slide-horizontal': (direction: number) => ({
    enter: {
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.35 },
      },
    },
    exit: {
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.25 },
    },
  }),

  'fade-zoom': () => ({
    enter: {
      opacity: 0,
      scale: 0.94,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 1.04,
      transition: { duration: 0.25 },
    },
  }),

  'vertical-reveal': (direction: number) => ({
    enter: {
      y: direction > 0 ? 60 : -60,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: 'spring', stiffness: 240, damping: 25 },
        opacity: { duration: 0.35 },
      },
    },
    exit: {
      y: direction < 0 ? 60 : -60,
      opacity: 0,
      transition: { duration: 0.25 },
    },
  }),

  'stagger-in': () => ({
    enter: {
      opacity: 0,
      scale: 0.96,
      y: 20,
    },
    center: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.35,
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  }),

  'soft-morph': () => ({
    enter: {
      opacity: 0,
      filter: 'blur(8px)',
      scale: 0.97,
    },
    center: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.45,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      filter: 'blur(6px)',
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  }),
};

export const itemStaggerVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

export const cardHoverEffect = {
  hover: {
    y: -4,
    boxShadow: '0 16px 32px -8px rgba(39, 51, 74, 0.12)',
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.99 },
};

