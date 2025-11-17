import { getApperClient } from "@/services/apperClient"
import { taskService } from "./taskService"
import { toast } from "react-toastify"

class ListService {
  constructor() {
    this.tableName = 'lists_c'
  }

  async getApperClient() {
    const client = getApperClient()
    if (!client) {
      throw new Error('ApperClient not available')
    }
    return client
  }

  async updateTaskCounts() {
    try {
      const lists = await this.getAll()
      const tasks = await taskService.getAll()
      
      return lists.map(list => ({
        ...list,
        taskCount: tasks.filter(task => 
          task.listId_c?.Id === list.Id || 
          parseInt(task.listId_c?.Id || 0) === parseInt(list.Id)
        ).length
      }))
    } catch (error) {
      console.error("Error updating task counts:", error)
      return []
    }
  }

  async getAll() {
    try {
      const apperClient = await this.getApperClient()
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}}, 
          {"field": {"Name": "Tags"}}, 
          {"field": {"Name": "color_c"}}
        ]
      }
      
      const response = await apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      if (!response.data || response.data.length === 0) {
        return []
      }
      
      return response.data
    } catch (error) {
      console.error("Error fetching lists:", error)
      toast.error("Failed to load lists")
      return []
    }
  }

  async getById(id) {
    try {
      const apperClient = await this.getApperClient()
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}}, 
          {"field": {"Name": "Tags"}}, 
          {"field": {"Name": "color_c"}}
        ]
      }
      
      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params)
      
      if (!response.data) {
        return null
      }
      
      return response.data
    } catch (error) {
      console.error(`Error fetching list ${id}:`, error)
      throw new Error("List not found")
    }
  }

  async create(listData) {
    try {
      const apperClient = await this.getApperClient()
      
      const params = {
        records: [{
          Name: listData.name || listData.Name,
          Tags: listData.tags || "",
          color_c: listData.color || listData.color_c || "#6366F1"
        }]
      }
      
      const response = await apperClient.createRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} lists:`, failed)
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successful.length > 0) {
          toast.success("List created successfully!")
          return successful[0].data
        }
      }
      
      throw new Error("Failed to create list")
    } catch (error) {
      console.error("Error creating list:", error)
      throw error
    }
  }

  async update(id, updateData) {
    try {
      const apperClient = await this.getApperClient()
      
      const updateFields = {}
      if (updateData.name !== undefined || updateData.Name !== undefined) {
        updateFields.Name = updateData.name || updateData.Name
      }
      if (updateData.tags !== undefined || updateData.Tags !== undefined) {
        updateFields.Tags = updateData.tags || updateData.Tags
      }
      if (updateData.color !== undefined || updateData.color_c !== undefined) {
        updateFields.color_c = updateData.color || updateData.color_c
      }
      
      const params = {
        records: [{
          Id: parseInt(id),
          ...updateFields
        }]
      }
      
      const response = await apperClient.updateRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} lists:`, failed)
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successful.length > 0) {
          toast.success("List updated successfully!")
          return successful[0].data
        }
      }
      
      throw new Error("Failed to update list")
    } catch (error) {
      console.error("Error updating list:", error)
      throw error
    }
  }

  async delete(id) {
    try {
      const apperClient = await this.getApperClient()
      
      // Move tasks from deleted list to first available list
      const allLists = await this.getAll()
      const defaultList = allLists.find(list => list.Id !== parseInt(id))
      
      if (defaultList) {
        const tasks = await taskService.getAll()
        const affectedTasks = tasks.filter(task => 
          task.listId_c?.Id === parseInt(id) || 
          parseInt(task.listId_c?.Id || 0) === parseInt(id)
        )
        
        for (const task of affectedTasks) {
          await taskService.update(task.Id, { listId_c: defaultList.Id })
        }
      }
      
      const params = { 
        RecordIds: [parseInt(id)]
      }
      
      const response = await apperClient.deleteRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} lists:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successful.length > 0) {
          toast.success("List deleted successfully!")
          return true
        }
      }
      
      return false
    } catch (error) {
      console.error("Error deleting list:", error)
      throw error
    }
  }
}

export const listService = new ListService()