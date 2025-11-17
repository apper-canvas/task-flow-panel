import ApperIcon from "@/components/ApperIcon"

const Loading = ({ className = "" }) => {
  return (
    <div className={`min-h-[400px] flex items-center justify-center ${className}`}>
      <div className="text-center space-y-4">
        <div className="relative">
          <ApperIcon 
            name="CheckSquare" 
            className="h-12 w-12 text-primary animate-pulse mx-auto" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20 rounded-full animate-ping"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-32 mx-auto animate-pulse"></div>
          <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-24 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading