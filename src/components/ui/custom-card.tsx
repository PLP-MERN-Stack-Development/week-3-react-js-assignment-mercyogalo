import * as React from "react";
import { cn } from "@/lib/utils";

const CustomCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    variant?: "default" | "elevated" | "gradient";
    animation?: boolean;
  }
>(({ className, variant = "default", animation = true, ...props }, ref) => {
  const variants = {
    default: "bg-card text-card-foreground shadow-soft",
    elevated: "bg-gradient-card text-card-foreground shadow-medium hover:shadow-strong",
    gradient: "bg-gradient-primary text-white shadow-medium"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border p-6 transition-all duration-300",
        variants[variant],
        animation && "hover:-translate-y-1 hover:scale-[1.02]",
        className
      )}
      {...props}
    />
  );
});
CustomCard.displayName = "CustomCard";

const CustomCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
));
CustomCardHeader.displayName = "CustomCardHeader";

const CustomCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CustomCardTitle.displayName = "CustomCardTitle";

const CustomCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CustomCardDescription.displayName = "CustomCardDescription";

const CustomCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CustomCardContent.displayName = "CustomCardContent";

const CustomCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
CustomCardFooter.displayName = "CustomCardFooter";

export { 
  CustomCard, 
  CustomCardHeader, 
  CustomCardFooter, 
  CustomCardTitle, 
  CustomCardDescription, 
  CustomCardContent 
};