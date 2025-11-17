import SearchBar from "@/components/molecules/SearchBar"
import FilterTabs from "@/components/molecules/FilterTabs"
import SortDropdown from "@/components/molecules/SortDropdown"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Header = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  onAddTask
}) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          {/* Left side - Title and search */}
          <div className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-6">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Task Flow
              </h1>
              <p className="text-sm text-gray-600">Organize your work effortlessly</p>
            </div>
            
            <SearchBar
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks..."
              className="flex-1 lg:max-w-md"
            />
          </div>
          
          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={onAddTask}
              className="shadow-lg hover:shadow-xl"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>
        
        {/* Filters and Sort */}
        <div className="flex flex-col space-y-3 mt-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={onFilterChange}
            className="max-w-md"
          />
          
          <SortDropdown
            selectedSort={sortBy}
            onSortChange={onSortChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Header