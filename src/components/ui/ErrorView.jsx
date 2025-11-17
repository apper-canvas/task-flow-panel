import ApperIcon from "@/components/ApperIcon"

const ErrorView = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading your tasks. Please try again.", 
  onRetry,
  className = "" 
}) => {
  return (
    <div className={`min-h-[400px] flex items-center justify-center p-6 ${className}`}>
      <div className="text-center space-y-6 max-w-md">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="AlertTriangle" className="h-10 w-10 text-red-600" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl active:scale-95"
          >
            <ApperIcon name="RotateCcw" className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorView