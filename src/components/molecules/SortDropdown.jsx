import { useState, useRef, useEffect } from "react"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const SortDropdown = ({ 
  selectedSort, 
  onSortChange, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  
  const sortOptions = [
    { key: "createdAt", label: "Date Created", icon: "Calendar" },
    { key: "dueDate", label: "Due Date", icon: "Clock" },
    { key: "priority", label: "Priority", icon: "Flag" },
    { key: "title", label: "Alphabetical", icon: "AlphabeticalSort" }
  ]
  
  const selectedOption = sortOptions.find(option => option.key === selectedSort) || sortOptions[0]
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  
  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
      >
        <ApperIcon name={selectedOption.icon} className="h-4 w-4 text-gray-500" />
        <span className="text-gray-700">Sort by {selectedOption.label}</span>
        <ApperIcon 
          name="ChevronDown" 
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => {
                onSortChange(option.key)
                setIsOpen(false)
              }}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200",
                selectedSort === option.key && "bg-primary/5 text-primary"
              )}
            >
              <ApperIcon name={option.icon} className="h-4 w-4" />
              <span className="text-sm font-medium">{option.label}</span>
              {selectedSort === option.key && (
                <ApperIcon name="Check" className="h-4 w-4 ml-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SortDropdown