import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "medium", 
  children, 
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary/90 text-white hover:brightness-110 focus:ring-primary/50 shadow-md hover:shadow-lg",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500/50 border border-gray-200",
    accent: "bg-gradient-to-r from-accent to-accent/90 text-white hover:brightness-110 focus:ring-accent/50 shadow-md hover:shadow-lg",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:brightness-110 focus:ring-red-500/50 shadow-md hover:shadow-lg",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500/50",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary/50"
  }
  
  const sizes = {
    small: "px-3 py-1.5 text-sm gap-1.5",
    medium: "px-4 py-2 text-sm gap-2",
    large: "px-6 py-3 text-base gap-2.5"
  }
  
  const iconSizes = {
    small: "h-4 w-4",
    medium: "h-4 w-4",
    large: "h-5 w-5"
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        (loading || disabled) && "pointer-events-none",
        className
      )}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          className={cn("animate-spin", iconSizes[size])} 
        />
      )}
      
      {!loading && icon && iconPosition === "left" && (
        <ApperIcon name={icon} className={iconSizes[size]} />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon name={icon} className={iconSizes[size]} />
      )}
    </button>
  )
})

Button.displayName = "Button"

export default Button