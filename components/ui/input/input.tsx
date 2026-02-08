import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Label } from "../label/label";

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all",
  {
    variants: {
      inputSize: {
        default: "h-11",
        sm: "h-10 px-3 text-xs",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & 
  VariantProps<typeof inputVariants> & {
    label?: string;
    error?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, startIcon, endIcon, id, inputSize, ...props }, ref) => {
    const inputId = id || React.useId();
    
    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <Label htmlFor={inputId} className={cn(
            error ? "text-destructive" : "",
            inputSize === "sm" && "text-[10px]"
          )}>
            {label}
          </Label>
        )}
        <div className="relative">
          {startIcon && (
            <div className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              inputSize === "sm" && "left-2.5"
            )}>
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ inputSize, className }),
              startIcon && (inputSize === "sm" ? "pl-8" : "pl-10"),
              endIcon && (inputSize === "sm" ? "pr-8" : "pr-10"),
              error && "border-destructive focus-visible:ring-destructive"
            )}
            id={inputId}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              inputSize === "sm" && "right-2.5"
            )}>
              {endIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
