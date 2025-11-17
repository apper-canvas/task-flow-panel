import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No tasks yet", 
  message = "Create your first task to get started with organizing your work.",
  actionLabel = "Add Task",
  onAction,
  icon = "CheckSquare",
  className = "" 
}) => {
  return (
    <div className={`min-h-[400px] flex items-center justify-center p-6 ${className}`}>
      <div className="text-center space-y-6 max-w-md">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name={icon} className="h-12 w-12 text-primary" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full animate-pulse"></div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>
        
        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:brightness-110 transition-all duration-200 font-medium shadow-lg hover:shadow-xl active:scale-95 animate-bounce-gentle"
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
            <span>{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Empty