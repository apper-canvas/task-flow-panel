import { useState, useEffect, useCallback } from "react"
import { taskService } from "@/services/api/taskService"
import { toast } from "react-toastify"

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError("")
      const data = await taskService.getAll()
      setTasks(data)
    } catch (err) {
      const message = err.message || "Failed to load tasks"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [])
  
  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      toast.success("Task created successfully!")
      return newTask
    } catch (err) {
      const message = err.message || "Failed to create task"
      toast.error(message)
      throw err
    }
  }
  
const updateTask = async (taskId, updateData) => {
    try {
      const updatedTask = await taskService.update(taskId, updateData)
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ))
      toast.success("Task updated successfully!")
      return updatedTask
    } catch (err) {
      const message = err.message || "Failed to update task"
      toast.error(message)
      throw err
    }
  }
  
  const deleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.Id !== taskId))
      toast.success("Task deleted successfully!")
    } catch (err) {
      const message = err.message || "Failed to delete task"
      toast.error(message)
      throw err
    }
  }
  
const toggleTaskComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId)
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ))
      
      if (updatedTask.completed_c) {
        toast.success("Task completed! Great job! 🎉")
      } else {
        toast.info("Task marked as incomplete")
      }
      
      return updatedTask
    } catch (err) {
      const message = err.message || "Failed to update task"
      toast.error(message)
      throw err
    }
  }
  
  const searchTasks = async (query) => {
    try {
      setLoading(true)
      setError("")
      const data = await taskService.search(query)
      setTasks(data)
    } catch (err) {
      const message = err.message || "Failed to search tasks"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadTasks()
  }, [loadTasks])
  
  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    searchTasks
  }
}