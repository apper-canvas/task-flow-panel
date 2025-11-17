import listsData from "@/services/mockData/lists.json"
import { taskService } from "./taskService"

class ListService {
  constructor() {
    this.storageKey = "task-flow-lists"
    this.initializeStorage()
  }

  initializeStorage() {
    const existingData = localStorage.getItem(this.storageKey)
    if (!existingData) {
      localStorage.setItem(this.storageKey, JSON.stringify(listsData))
    }
  }

  async delay() {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  getData() {
    const data = localStorage.getItem(this.storageKey)
    return data ? JSON.parse(data) : []
  }

  saveData(lists) {
    localStorage.setItem(this.storageKey, JSON.stringify(lists))
  }

  async updateTaskCounts() {
    const lists = this.getData()
    const tasks = await taskService.getAll()
    
    const updatedLists = lists.map(list => ({
      ...list,
      taskCount: tasks.filter(task => task.listId === list.Id.toString()).length
    }))
    
    this.saveData(updatedLists)
    return updatedLists
  }

  async getAll() {
    await this.delay()
    return this.updateTaskCounts()
  }

  async getById(id) {
    await this.delay()
    const lists = await this.updateTaskCounts()
    return lists.find(list => list.Id === parseInt(id)) || null
  }

  async create(listData) {
    await this.delay()
    const lists = this.getData()
    const maxId = lists.reduce((max, list) => Math.max(max, list.Id), 0)
    
    const newList = {
      Id: maxId + 1,
      name: listData.name,
      color: listData.color || "#6366F1",
      createdAt: new Date().toISOString(),
      taskCount: 0
    }
    
    lists.push(newList)
    this.saveData(lists)
    return { ...newList }
  }

  async update(id, updateData) {
    await this.delay()
    const lists = this.getData()
    const index = lists.findIndex(list => list.Id === parseInt(id))
    
    if (index === -1) {
      throw new Error("List not found")
    }
    
    const updatedList = {
      ...lists[index],
      ...updateData,
      Id: parseInt(id)
    }
    
    lists[index] = updatedList
    this.saveData(lists)
    return { ...updatedList }
  }

  async delete(id) {
    await this.delay()
    const lists = this.getData()
    const filteredLists = lists.filter(list => list.Id !== parseInt(id))
    
    if (filteredLists.length === lists.length) {
      throw new Error("List not found")
    }
    
    // Move tasks from deleted list to default list (Id: 1)
    const tasks = await taskService.getAll()
    const affectedTasks = tasks.filter(task => task.listId === id.toString())
    
    for (const task of affectedTasks) {
      await taskService.update(task.Id, { listId: "1" })
    }
    
    this.saveData(filteredLists)
    return true
  }
}

export const listService = new ListService()