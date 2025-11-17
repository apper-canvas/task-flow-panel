import { cn } from "@/utils/cn"

const FilterTabs = ({ 
  activeFilter, 
  onFilterChange, 
  className = "" 
}) => {
  const filters = [
    { key: "all", label: "All Tasks", count: null },
    { key: "active", label: "Active", count: null },
    { key: "completed", label: "Completed", count: null }
  ]

  return (
    <div className={cn("flex space-x-1 bg-gray-100 rounded-lg p-1", className)}>
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
            activeFilter === filter.key
              ? "bg-white text-primary shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default FilterTabs