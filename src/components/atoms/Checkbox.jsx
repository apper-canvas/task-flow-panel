import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  className, 
  checked = false,
  onChange,
  label,
  disabled = false,
  size = "medium",
  ...props 
}, ref) => {
  const checkboxId = props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
  
  const sizes = {
    small: "h-4 w-4",
    medium: "h-5 w-5",
    large: "h-6 w-6"
  }
  
  const iconSizes = {
    small: "h-3 w-3",
    medium: "h-3.5 w-3.5",
    large: "h-4 w-4"
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          id={checkboxId}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        
        <div
          onClick={() => !disabled && onChange?.({ target: { checked: !checked } })}
          className={cn(
            "border-2 rounded cursor-pointer transition-all duration-200 flex items-center justify-center",
            sizes[size],
            checked 
              ? "bg-primary border-primary text-white" 
              : "border-gray-300 bg-white hover:border-gray-400",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          {checked && (
            <ApperIcon 
              name="Check" 
              className={cn("animate-checkmark", iconSizes[size])} 
            />
          )}
        </div>
      </div>
      
      {label && (
        <label 
          htmlFor={checkboxId}
          className={cn(
            "text-sm font-medium select-none",
            disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700 cursor-pointer"
          )}
        >
          {label}
        </label>
      )}
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox