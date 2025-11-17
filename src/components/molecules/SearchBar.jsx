import { useState } from "react"
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search tasks...", 
  className = "",
  value: controlledValue,
  onChange: controlledOnChange
}) => {
  const [internalValue, setInternalValue] = useState("")
  
  const isControlled = controlledValue !== undefined
  const searchValue = isControlled ? controlledValue : internalValue
  
  const handleChange = (e) => {
    const newValue = e.target.value
    
    if (isControlled) {
      controlledOnChange?.(e)
    } else {
      setInternalValue(newValue)
    }
    
    onSearch?.(newValue)
  }
  
  const handleClear = () => {
    const newValue = ""
    
    if (isControlled) {
      controlledOnChange?.({ target: { value: newValue } })
    } else {
      setInternalValue(newValue)
    }
    
    onSearch?.(newValue)
  }

  return (
    <div className={cn("relative max-w-md", className)}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <ApperIcon name="Search" className="h-4 w-4 text-gray-400" />
        </div>
        
        <Input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        
        {searchValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <ApperIcon name="X" className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar