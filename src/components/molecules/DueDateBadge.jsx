import { format, isToday, isPast, isWithinInterval, addDays } from "date-fns"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const DueDateBadge = ({ dueDate, completed = false, className = "" }) => {
  if (!dueDate) return null
  
  const date = new Date(dueDate)
  const now = new Date()
  const isOverdue = isPast(date) && !isToday(date) && !completed
  const isDueToday = isToday(date)
  const isDueSoon = isWithinInterval(date, { start: now, end: addDays(now, 3) })
  
  let variant = "default"
  let icon = "Calendar"
  let textColor = "text-gray-600"
  let bgColor = "bg-gray-100"
  let borderColor = "border-gray-200"
  
  if (completed) {
    variant = "success"
    icon = "CheckCircle"
    textColor = "text-green-700"
    bgColor = "bg-green-100"
    borderColor = "border-green-200"
  } else if (isOverdue) {
    variant = "danger"
    icon = "AlertCircle"
    textColor = "text-red-700"
    bgColor = "bg-red-100"
    borderColor = "border-red-200"
  } else if (isDueToday) {
    variant = "warning"
    icon = "Clock"
    textColor = "text-accent-700"
    bgColor = "bg-accent-100"
    borderColor = "border-accent-200"
  } else if (isDueSoon) {
    variant = "info"
    icon = "Calendar"
    textColor = "text-blue-700"
    bgColor = "bg-blue-100"
    borderColor = "border-blue-200"
  }
  
  const formatDate = (date) => {
    if (isToday(date)) return "Today"
    return format(date, "MMM d")
  }
  
  return (
    <Badge 
      variant={variant}
      className={cn(
        "inline-flex items-center space-x-1",
        bgColor,
        textColor,
        borderColor,
        className
      )}
    >
      <ApperIcon name={icon} className="h-3 w-3" />
      <span>{formatDate(date)}</span>
    </Badge>
  )
}

export default DueDateBadge