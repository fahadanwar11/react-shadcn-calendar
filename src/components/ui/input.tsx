import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const inputStyles: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  borderRadius: '6px',
  border: '1px solid #e2e8f0',
  backgroundColor: '#ffffff',
  padding: '10px 12px',
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#0f172a',
  outline: 'none',
  transition: 'all 0.2s',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ style, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    
    const focusStyles: React.CSSProperties = isFocused ? {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    } : {};

    return (
      <input
        type={type}
        style={{
          ...inputStyles,
          ...focusStyles,
          ...style,
        }}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
