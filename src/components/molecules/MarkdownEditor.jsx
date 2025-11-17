import { useState } from "react"
import ReactMarkdown from "react-markdown"
import Button from "@/components/atoms/Button"
import Textarea from "@/components/atoms/Textarea"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const MarkdownEditor = ({ 
  label, 
  value = "", 
  onChange, 
  placeholder = "Write your notes in markdown...",
  rows = 6,
  className = "",
  ...props 
}) => {
  const [showPreview, setShowPreview] = useState(false)

  const handleChange = (e) => {
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Header with toggle buttons */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
              !showPreview
                ? "bg-white text-gray-900 border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <ApperIcon name="Edit" size={16} />
            Write
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
              showPreview
                ? "bg-white text-gray-900 border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <ApperIcon name="Eye" size={16} />
            Preview
          </button>
        </div>

        {/* Content area */}
        <div className="min-h-[150px]">
          {showPreview ? (
            <div className="p-4">
              {value ? (
                <ReactMarkdown className="markdown-content prose prose-sm max-w-none">
                  {value}
                </ReactMarkdown>
              ) : (
                <p className="text-gray-500 italic">Nothing to preview</p>
              )}
            </div>
          ) : (
            <Textarea
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              rows={rows}
              className="border-0 resize-none focus:ring-0 rounded-none"
              {...props}
            />
          )}
        </div>
      </div>

      {/* Helper text */}
      <p className="text-xs text-gray-500">
        Supports markdown formatting: **bold**, *italic*, `code`, lists, links, and more
      </p>
    </div>
  )
}

export default MarkdownEditor