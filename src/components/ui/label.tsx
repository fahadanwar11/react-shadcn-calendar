import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

const labelStyles: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#0f172a',
  marginBottom: '6px',
  display: 'block',
  lineHeight: '1.5',
};

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ style, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    style={{ ...labelStyles, ...style }}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;
