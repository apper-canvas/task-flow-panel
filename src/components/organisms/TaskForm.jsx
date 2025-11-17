import { useState, useEffect } from "react"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"
import ListSelector from "@/components/molecules/ListSelector"
import MarkdownEditor from "@/components/molecules/MarkdownEditor"
import ApperIcon from "@/components/ApperIcon"

const TaskForm = ({ 
  task = null, 
  onSubmit, 
  onCancel,
  loading = false 
}) => {
const [formData, setFormData] = useState({
    title: "",
    description: "",
    notes: "",
    priority: "medium",
    dueDate: "",
    listId: "1"
  })
  
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    if (task) {
      setFormData({
title: task.title || "",
        description: task.description || "",
        notes: task.notes_c || "",
        priority: task.priority_c || "medium",
        dueDate: task.dueDate_c || "",
        listId: task.listId_c?.Id?.toString() || "1"
      })
    }
  }, [task])
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    
    if (formData.dueDate) {
      const today = new Date().toISOString().split("T")[0]
      if (formData.dueDate < today) {
        newErrors.dueDate = "Due date cannot be in the past"
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    const taskData = {
      ...formData,
      dueDate: formData.dueDate || null
    }
    
    onSubmit(taskData)
  }
  
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Task Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter task title..."
          required
          error={errors.title}
        />
        
        <Textarea
label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Add details about this task..."
          rows={3}
        />

        <MarkdownEditor
          label="Notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Add detailed notes with markdown formatting..."
          rows={6}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Priority"
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </Select>
          
          <Input
            type="date"
            label="Due Date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            error={errors.dueDate}
            helperText="Leave empty if no due date"
          />
        </div>
        
        <ListSelector
          value={formData.listId}
          onChange={(e) => handleChange("listId", e.target.value)}
        />
      </div>
      
      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="submit"
          loading={loading}
          className="flex-1 md:flex-initial"
        >
          <ApperIcon name={task ? "Save" : "Plus"} className="h-4 w-4" />
          {task ? "Update Task" : "Create Task"}
        </Button>
        
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default TaskForm