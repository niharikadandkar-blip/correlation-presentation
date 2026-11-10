import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface PastelCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'cream' | 'powder' | 'lavender' | 'peach' | 'mint' | 'pink' | 'white';
  className?: string;
  bordered?: boolean;
  hoverable?: boolean;
}

const variantStyles: Record<string, string> = {
  cream: 'bg-[#FFF8EF] border-[#FDEFD9]',
  powder: 'bg-[#DCEBFA]/40 border-[#B8D8F7]/60',
  lavender: 'bg-[#E9E1FA]/45 border-[#D5C4F7]/60',
  peach: 'bg-[#FFE0D2]/45 border-[#FFC8B3]/60',
  mint: 'bg-[#DDEFE1]/45 border-[#BDDEC4]/60',
  pink: 'bg-[#F8DCE5]/45 border-[#F2BDCE]/60',
  white: 'bg-white/90 border-[#E2E8F0]/80 shadow-soft backdrop-blur-sm',
};

export const PastelCard: React.FC<PastelCardProps> = ({
  children,
  variant = 'white',
  className = '',
  bordered = true,
  hoverable = false,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={`rounded-2xl p-5 ${variantStyles[variant]} ${
        bordered ? 'border' : ''
      } transition-colors ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

