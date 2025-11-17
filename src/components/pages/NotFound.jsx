import { useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const NotFound = () => {
  const navigate = useNavigate()
  
  const handleGoHome = () => {
    navigate("/")
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-md">
        {/* 404 Icon */}
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="FileQuestion" className="h-16 w-16 text-primary" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full animate-pulse"></div>
        </div>
        
        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The page you're looking for doesn't exist. Let's get you back to organizing your tasks!
          </p>
        </div>
        
        {/* Actions */}
        <div className="space-y-4">
          <Button
            onClick={handleGoHome}
            className="w-full shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="Home" className="h-4 w-4" />
            Back to Tasks
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => window.history.back()}
            className="w-full"
          >
            <ApperIcon name="ArrowLeft" className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound