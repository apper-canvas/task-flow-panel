import tasksData from "@/services/mockData/tasks.json"

class TaskService {
  constructor() {
    this.storageKey = "task-flow-tasks"
    this.initializeStorage()
  }

  initializeStorage() {
    const existingData = localStorage.getItem(this.storageKey)
    if (!existingData) {
      localStorage.setItem(this.storageKey, JSON.stringify(tasksData))
    }
  }

  async delay() {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  getData() {
    const data = localStorage.getItem(this.storageKey)
    return data ? JSON.parse(data) : []
  }

  saveData(tasks) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks))
  }

  async getAll() {
    await this.delay()
    return [...this.getData()]
  }

  async getById(id) {
    await this.delay()
    const tasks = this.getData()
    return tasks.find(task => task.Id === parseInt(id)) || null
  }

  async getByListId(listId) {
    await this.delay()
    const tasks = this.getData()
    return tasks.filter(task => task.listId === listId.toString())
  }

  async create(taskData) {
    await this.delay()
    const tasks = this.getData()
    const maxId = tasks.reduce((max, task) => Math.max(max, task.Id), 0)
    
    const newTask = {
      Id: maxId + 1,
      title: taskData.title,
      description: taskData.description || "",
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      completed: false,
      listId: taskData.listId || "1",
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    
    tasks.push(newTask)
    this.saveData(tasks)
    return { ...newTask }
  }

  async update(id, updateData) {
    await this.delay()
    const tasks = this.getData()
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    
    if (index === -1) {
      throw new Error("Task not found")
    }
    
    const updatedTask = {
      ...tasks[index],
      ...updateData,
      Id: parseInt(id)
    }
    
    // Handle completion status
    if (updateData.completed !== undefined) {
      if (updateData.completed && !tasks[index].completed) {
        updatedTask.completedAt = new Date().toISOString()
      } else if (!updateData.completed && tasks[index].completed) {
        updatedTask.completedAt = null
      }
    }
    
    tasks[index] = updatedTask
    this.saveData(tasks)
    return { ...updatedTask }
  }

  async delete(id) {
    await this.delay()
    const tasks = this.getData()
    const filteredTasks = tasks.filter(task => task.Id !== parseInt(id))
    
    if (filteredTasks.length === tasks.length) {
      throw new Error("Task not found")
    }
    
    this.saveData(filteredTasks)
    return true
  }

  async toggleComplete(id) {
    await this.delay()
    const tasks = this.getData()
    const task = tasks.find(task => task.Id === parseInt(id))
    
    if (!task) {
      throw new Error("Task not found")
    }
    
    return this.update(id, { completed: !task.completed })
  }

  async search(query) {
    await this.delay()
    const tasks = this.getData()
    const lowercaseQuery = query.toLowerCase()
    
    return tasks.filter(task => 
      task.title.toLowerCase().includes(lowercaseQuery) ||
      task.description.toLowerCase().includes(lowercaseQuery)
    )
  }

  async getByStatus(completed) {
    await this.delay()
    const tasks = this.getData()
    return tasks.filter(task => task.completed === completed)
  }
}

export const taskService = new TaskService()