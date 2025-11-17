import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "@/components/organisms/TaskCard"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import Empty from "@/components/ui/Empty"

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onRetry,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onAddTask,
  className = "" 
}) => {
  if (loading) {
    return <Loading className={className} />
  }
  
  if (error) {
    return (
      <ErrorView 
        title="Failed to load tasks"
        message={error}
        onRetry={onRetry}
        className={className}
      />
    )
  }
  
  if (tasks.length === 0) {
    return (
      <Empty
        title="No tasks found"
        message="Create your first task to get started with organizing your work."
        actionLabel="Add Task"
        onAction={onAddTask}
        className={className}
      />
    )
  }
  
  return (
    <div className={`space-y-4 ${className}`}>
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList