import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'link';
}

const buttonBaseStyles: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
  padding: '10px 16px',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s',
  outline: 'none',
};

const getVariantStyles = (variant?: string): React.CSSProperties => {
  switch (variant) {
    case 'destructive':
      return {
        backgroundColor: '#ef4444',
        color: '#ffffff',
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        border: '1px solid #e2e8f0',
        color: '#334155',
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        color: '#334155',
      };
    default:
      return {
        backgroundColor: '#0f172a',
        color: '#ffffff',
      };
  }
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ style, children, variant = 'default', disabled, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    
    const variantStyles = getVariantStyles(variant);
    const hoverStyles: React.CSSProperties = isHovered && !disabled ? {
      opacity: 0.9,
      transform: 'translateY(-1px)',
    } : {};
    
    const disabledStyles: React.CSSProperties = disabled ? {
      opacity: 0.5,
      cursor: 'not-allowed',
    } : {};

    return (
      <button
        ref={ref}
        style={{
          ...buttonBaseStyles,
          ...variantStyles,
          ...hoverStyles,
          ...disabledStyles,
          ...style,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
