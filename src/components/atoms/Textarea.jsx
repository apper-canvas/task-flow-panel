import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Textarea = forwardRef(({ 
  className, 
  label,
  error,
  helperText,
  required = false,
  rows = 3,
  ...props 
}, ref) => {
  const textareaId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="space-y-1.5">
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        rows={rows}
        className={cn(
          "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 transition-all duration-200 resize-vertical",
          "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
          "hover:border-gray-400",
          error && "border-red-300 focus:border-red-500 focus:ring-red-500/20",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200",
          className
        )}
        ref={ref}
        id={textareaId}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        {...props}
      />
      
      {error && (
        <p id={`${textareaId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${textareaId}-helper`} className="text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  )
})

Textarea.displayName = "Textarea"

export default Textarea