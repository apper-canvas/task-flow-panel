import { motion } from "framer-motion"
import Checkbox from "@/components/atoms/Checkbox"
import Button from "@/components/atoms/Button"
import PriorityBadge from "@/components/molecules/PriorityBadge"
import DueDateBadge from "@/components/molecules/DueDateBadge"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  className = "" 
}) => {
  const handleToggleComplete = async () => {
    try {
      await onToggleComplete(task.Id)
    } catch (error) {
      console.error("Failed to toggle task completion:", error)
    }
  }
  
  const handleEdit = () => {
    onEdit(task)
  }
  
  const handleDelete = () => {
    onDelete(task.Id)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "card card-hover p-4 group",
task.completed_c && "task-complete bg-gray-50",
        className
      )}
    >
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <Checkbox
checked={task.completed_c}
            onChange={handleToggleComplete}
            size="large"
            className={task.completed ? "animate-checkmark" : ""}
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <h3 className={cn(
                "text-lg font-semibold text-gray-900 task-title",
task.completed_c && "line-through text-gray-500"
              )}>
{task.title_c}
              </h3>
              
{task.description_c && (
                <p className={cn(
"mt-1 text-sm text-gray-600 line-clamp-2",
                  task.completed && "text-gray-400"
                )}>
{task.description_c}
                </p>
              )}
              
              {/* Badges */}
              <div className="flex items-center space-x-2 mt-3">
<PriorityBadge priority={task.priority_c} />
                <DueDateBadge 
dueDate={task.dueDate_c} 
                  completed={task.completed_c}
                />
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="small"
                onClick={handleEdit}
                className="p-2"
              >
                <ApperIcon name="Edit2" className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="small"
                onClick={handleDelete}
                className="p-2 hover:text-red-600"
              >
                <ApperIcon name="Trash2" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard