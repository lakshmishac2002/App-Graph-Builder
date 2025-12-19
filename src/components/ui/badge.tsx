import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          {
            'border-transparent bg-primary text-primary-foreground':
              variant === 'default',
            'border-transparent bg-green-500/20 text-green-400 border-green-500/30':
              variant === 'success',
            'border-transparent bg-yellow-500/20 text-yellow-400 border-yellow-500/30':
              variant === 'warning',
            'border-transparent bg-destructive/20 text-destructive border-destructive/30':
              variant === 'destructive',
            'text-foreground': variant === 'outline',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
