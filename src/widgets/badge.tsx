import React from 'react';
import { cn } from '../utils/cn'; // your cn utility

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  /** @default true */
  glass?: boolean;
}

const variantTints: Record<BadgeVariant, string> = {
  primary: 'bg-primary/8 border-primary/30 text-primary',
  success: 'bg-emerald-500/8 border-emerald-400/30 text-emerald-100',
  warning: 'bg-amber-500/8 border-amber-400/30 text-amber-100',
  danger: 'bg-red-500/8 border-red-400/30 text-red-100',
  info: 'bg-cyan-500/8 border-cyan-400/30 text-cyan-100',
  purple: 'bg-violet-500/8 border-violet-400/30 text-violet-100',
};

const Badge: React.FC<BadgeProps> = ({
  children,
  icon,
  variant = 'primary',
  className,
  glass = true,
}) => {
  const baseStyles = cn(
    'inline-flex items-center gap-1.5 py-1 px-2.5',
    'text-sm font-medium',
    'rounded-2xl',
    'transition-all duration-200',
    // Core glassmorphism
    glass && [
      'backdrop-blur-md',                    // the magic blur
      'bg-white/5',                          // very subtle base (works in dark/light)
      'border',
      'shadow-sm',                           // light lift
      'relative isolate',                    // helps with pseudo elements if needed
    ],
    variantTints[variant],
    className
  );

  // Optional subtle "liquid shine" highlight (inner gradient reflection)
  const shine = glass
    ? cn(
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl',
        'before:bg-gradient-to-br before:from-white/15 before:via-transparent before:to-transparent',
        'before:opacity-70'
      )
    : '';

  return (
    <div className={cn(baseStyles, shine)}>
      {icon && (
        <span className="size-4.5 flex items-center justify-center opacity-90">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </div>
  );
};

export default Badge;