// Button component - Users need to install via: npx shadcn@latest add button
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'link';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, ...props }, ref) => {
    return (
      <button ref={ref} className={className} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
