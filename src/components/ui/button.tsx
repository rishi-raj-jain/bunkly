import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-caslon text-[12px] uppercase transition-colors duration-250 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-ivory hover:bg-oxblood",
        destructive:
          "bg-oxblood text-ivory hover:bg-ink",
        outline:
          "border border-brass bg-transparent text-ink hover:border-oxblood hover:text-oxblood",
        secondary:
          "border border-brass bg-ivory-warm text-ink hover:bg-parchment",
        ghost:
          "text-ink hover:bg-parchment hover:text-ink",
        link:
          "text-oxblood underline-offset-4 hover:underline",
        accent:
          "bg-ink text-ivory hover:bg-oxblood",
      },
      size: {
        default: "h-10 px-6 tracking-[0.28em]",
        sm: "h-9 px-4 text-[11px] tracking-[0.24em]",
        lg: "h-12 px-10 tracking-[0.3em]",
        icon: "h-10 w-10 tracking-normal",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
