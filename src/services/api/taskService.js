import { getApperClient } from "@/services/apperClient"
import { toast } from "react-toastify"

class TaskService {
  constructor() {
    this.tableName = 'tasks_c'
  }

  async getApperClient() {
    const client = getApperClient()
    if (!client) {
      throw new Error('ApperClient not available')
    }
    return client
  }

  async getAll() {
    try {
      const apperClient = await this.getApperClient()
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}}, 
          {"field": {"Name": "Tags"}}, 
          {"field": {"Name": "title_c"}}, 
          {"field": {"Name": "description_c"}}, 
          {"field": {"Name": "priority_c"}}, 
          {"field": {"Name": "dueDate_c"}}, 
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "listId_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "CreatedOn"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
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
      console.error("Error fetching tasks:", error)
      toast.error("Failed to load tasks")
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
          {"field": {"Name": "title_c"}}, 
          {"field": {"Name": "description_c"}}, 
          {"field": {"Name": "priority_c"}}, 
          {"field": {"Name": "dueDate_c"}}, 
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "listId_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "CreatedOn"}}
        ]
      }
      
      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params)
      
      if (!response.data) {
        return null
      }
      
      return response.data
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error)
      return null
    }
  }

  async getByListId(listId) {
    try {
      const apperClient = await this.getApperClient()
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}}, 
          {"field": {"Name": "Tags"}}, 
          {"field": {"Name": "title_c"}}, 
          {"field": {"Name": "description_c"}}, 
          {"field": {"Name": "priority_c"}}, 
          {"field": {"Name": "dueDate_c"}}, 
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "listId_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "CreatedOn"}}
        ],
        where: [{"FieldName": "listId_c", "Operator": "EqualTo", "Values": [parseInt(listId)]}],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
      }
      
      const response = await apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error fetching tasks by list:", error)
      return []
    }
  }

  async create(taskData) {
    try {
      const apperClient = await this.getApperClient()
      
      const params = {
        records: [{
          Name: taskData.title || taskData.title_c || "Untitled Task",
          Tags: taskData.tags || "",
          title_c: taskData.title || taskData.title_c || "",
          description_c: taskData.description || taskData.description_c || "",
          priority_c: taskData.priority || taskData.priority_c || "medium",
          dueDate_c: taskData.dueDate || taskData.dueDate_c || null,
          completed_c: false,
          listId_c: parseInt(taskData.listId || taskData.listId_c || 1)
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
          console.error(`Failed to create ${failed.length} tasks:`, failed)
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successful.length > 0) {
          return successful[0].data
        }
      }
      
      throw new Error("Failed to create task")
    } catch (error) {
      console.error("Error creating task:", error)
      throw error
    }
  }

  async update(id, updateData) {
    try {
      const apperClient = await this.getApperClient()
      
      const updateFields = {
        Id: parseInt(id)
      }
      
      if (updateData.title !== undefined || updateData.title_c !== undefined) {
        const title = updateData.title || updateData.title_c
        updateFields.Name = title
        updateFields.title_c = title
      }
      if (updateData.description !== undefined || updateData.description_c !== undefined) {
        updateFields.description_c = updateData.description || updateData.description_c
      }
      if (updateData.priority !== undefined || updateData.priority_c !== undefined) {
        updateFields.priority_c = updateData.priority || updateData.priority_c
      }
      if (updateData.dueDate !== undefined || updateData.dueDate_c !== undefined) {
        updateFields.dueDate_c = updateData.dueDate || updateData.dueDate_c
      }
      if (updateData.completed !== undefined || updateData.completed_c !== undefined) {
        updateFields.completed_c = updateData.completed !== undefined ? updateData.completed : updateData.completed_c
      }
      if (updateData.listId !== undefined || updateData.listId_c !== undefined) {
        updateFields.listId_c = parseInt(updateData.listId || updateData.listId_c)
      }
      if (updateData.tags !== undefined || updateData.Tags !== undefined) {
        updateFields.Tags = updateData.tags || updateData.Tags
      }
      
      const params = {
        records: [updateFields]
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
          console.error(`Failed to update ${failed.length} tasks:`, failed)
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successful.length > 0) {
          return successful[0].data
        }
      }
      
      throw new Error("Failed to update task")
    } catch (error) {
      console.error("Error updating task:", error)
      throw error
    }
  }

  async delete(id) {
    try {
      const apperClient = await this.getApperClient()
      
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
          console.error(`Failed to delete ${failed.length} tasks:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        return successful.length > 0
      }
      
      return false
    } catch (error) {
      console.error("Error deleting task:", error)
      throw error
    }
  }

  async toggleComplete(id) {
    try {
      const task = await this.getById(id)
      
      if (!task) {
        throw new Error("Task not found")
      }
      
      return this.update(id, { completed_c: !task.completed_c })
    } catch (error) {
      console.error("Error toggling task completion:", error)
      throw error
    }
  }

  async search(query) {
    try {
      const apperClient = await this.getApperClient()
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}}, 
          {"field": {"Name": "Tags"}}, 
          {"field": {"Name": "title_c"}}, 
          {"field": {"Name": "description_c"}}, 
          {"field": {"Name": "priority_c"}}, 
          {"field": {"Name": "dueDate_c"}}, 
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "listId_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "CreatedOn"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {"conditions": [{"fieldName": "title_c", "operator": "Contains", "values": [query]}], "operator": "OR"},
            {"conditions": [{"fieldName": "description_c", "operator": "Contains", "values": [query]}], "operator": "OR"}
          ]
        }],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
      }
      
      const response = await apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error searching tasks:", error)
      return []
    }
  }

  async getByStatus(completed) {
    try {
      const apperClient = await this.getApperClient()
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}}, 
          {"field": {"Name": "Tags"}}, 
          {"field": {"Name": "title_c"}}, 
          {"field": {"Name": "description_c"}}, 
          {"field": {"Name": "priority_c"}}, 
          {"field": {"Name": "dueDate_c"}}, 
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "listId_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "CreatedOn"}}
        ],
        where: [{"FieldName": "completed_c", "Operator": "ExactMatch", "Values": [completed]}],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
      }
      
      const response = await apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error fetching tasks by status:", error)
      return []
    }
  }
}

export const taskService = new TaskService()