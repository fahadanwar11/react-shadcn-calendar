// Dialog components - Users need to install via: npx shadcn@latest add dialog
import * as React from 'react';
export * from '@radix-ui/react-dialog';

// Additional dialog components
export const DialogBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
));
DialogBody.displayName = "DialogBody";

export const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
));
DialogHeader.displayName = "DialogHeader";

export const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
));
DialogFooter.displayName = "DialogFooter";
