import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const PriorityBadge = ({ priority, className = "" }) => {
  const priorityConfig = {
    high: {
      label: "High",
      variant: "high",
      icon: "AlertTriangle",
      className: "bg-red-100 text-red-800 border-red-200"
    },
    medium: {
      label: "Medium",
      variant: "medium", 
      icon: "Flag",
      className: "bg-accent-100 text-accent-800 border-accent-200"
    },
    low: {
      label: "Low",
      variant: "low",
      icon: "Minus",
      className: "bg-blue-100 text-blue-800 border-blue-200"
    }
  }
  
  const config = priorityConfig[priority] || priorityConfig.medium
  
  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, "inline-flex items-center space-x-1", className)}
    >
      <ApperIcon name={config.icon} className="h-3 w-3" />
      <span>{config.label}</span>
    </Badge>
  )
}

export default PriorityBadge