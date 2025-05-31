
import React from 'react';
import { cn } from '@/lib/utils';
import styles from './index.module.css';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(styles.label, className)}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }
