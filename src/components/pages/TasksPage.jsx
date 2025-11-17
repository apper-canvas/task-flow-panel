import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Header from "@/components/organisms/Header"
import TaskList from "@/components/organisms/TaskList"
import TaskModal from "@/components/organisms/TaskModal"
import DeleteConfirmModal from "@/components/organisms/DeleteConfirmModal"
import { useTasks } from "@/hooks/useTasks"
import { filterTasks, sortTasks } from "@/utils/taskUtils"

const TasksPage = () => {
  const {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete
  } = useTasks()
  
  // Local state for UI
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingTaskId, setDeletingTaskId] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  
  // Filtered and sorted tasks
const filteredTasks = useMemo(() => {
    let filtered = tasks
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task =>
        (task.title_c || '').toLowerCase().includes(query) ||
        (task.description_c || '').toLowerCase().includes(query)
      )
    }
    
    // Apply status filter
    filtered = filterTasks(filtered, activeFilter)
    
    // Apply sort
    return sortTasks(filtered, sortBy)
  }, [tasks, searchQuery, activeFilter, sortBy])
  
  // Handlers
  const handleAddTask = () => {
    setEditingTask(null)
    setShowTaskModal(true)
  }
  
  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskModal(true)
  }
  
  const handleDeleteTask = (taskId) => {
    setDeletingTaskId(taskId)
    setShowDeleteModal(true)
  }
  
  const handleTaskSubmit = async (taskData) => {
    try {
      setModalLoading(true)
      
      if (editingTask) {
        await updateTask(editingTask.Id, taskData)
      } else {
        await createTask(taskData)
      }
      
      setShowTaskModal(false)
      setEditingTask(null)
    } catch (error) {
      // Error handling is done in the hook
    } finally {
      setModalLoading(false)
    }
  }
  
  const handleDeleteConfirm = async () => {
    if (!deletingTaskId) return
    
    try {
      setModalLoading(true)
      await deleteTask(deletingTaskId)
      setShowDeleteModal(false)
      setDeletingTaskId(null)
    } catch (error) {
      // Error handling is done in the hook
    } finally {
      setModalLoading(false)
    }
  }
  
  const handleModalClose = () => {
    if (modalLoading) return
    
    setShowTaskModal(false)
    setShowDeleteModal(false)
    setEditingTask(null)
    setDeletingTaskId(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onAddTask={handleAddTask}
      />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TaskList
            tasks={filteredTasks}
            loading={loading}
            error={error}
            onRetry={loadTasks}
            onToggleComplete={toggleTaskComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={handleAddTask}
          />
        </motion.div>
      </main>
      
      {/* Task Modal */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={handleModalClose}
        task={editingTask}
        onSubmit={handleTaskSubmit}
        loading={modalLoading}
      />
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        loading={modalLoading}
      />
    </div>
  )
}

export default TasksPage