import { parseISO, isAfter, isBefore, compareAsc, compareDesc } from "date-fns"

export const filterTasks = (tasks, filter) => {
  switch (filter) {
    case "active":
      return tasks.filter(task => !task.completed)
    case "completed":
      return tasks.filter(task => task.completed)
    default:
      return tasks
  }
}

export const sortTasks = (tasks, sortBy) => {
  const sortedTasks = [...tasks]
  
  switch (sortBy) {
    case "dueDate":
      return sortedTasks.sort((a, b) => {
        // Tasks without due dates go to the end
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        
        return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate))
      })
      
    case "priority":
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return sortedTasks.sort((a, b) => {
        const aPriority = priorityOrder[a.priority] || 0
        const bPriority = priorityOrder[b.priority] || 0
        return bPriority - aPriority
      })
      
    case "title":
      return sortedTasks.sort((a, b) => 
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      )
      
    case "createdAt":
    default:
      return sortedTasks.sort((a, b) => 
        compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
      )
  }
}

export const getTaskStats = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const active = total - completed
  const overdue = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false
    return isBefore(parseISO(task.dueDate), new Date())
  }).length
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return {
    total,
    completed,
    active,
    overdue,
    completionRate
  }
}

export const getTasksByPriority = (tasks) => {
  return {
    high: tasks.filter(task => task.priority === "high"),
    medium: tasks.filter(task => task.priority === "medium"),
    low: tasks.filter(task => task.priority === "low")
  }
}

export const getUpcomingTasks = (tasks, days = 7) => {
  const now = new Date()
  const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000))
  
  return tasks.filter(task => {
    if (!task.dueDate || task.completed) return false
    const dueDate = parseISO(task.dueDate)
    return isAfter(dueDate, now) && isBefore(dueDate, futureDate)
  })
}