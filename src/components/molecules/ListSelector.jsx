import { useState, useEffect } from "react"
import Select from "@/components/atoms/Select"
import { listService } from "@/services/api/listService"

const ListSelector = ({ value, onChange, className = "" }) => {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    loadLists()
  }, [])
  
  const loadLists = async () => {
    try {
      setLoading(true)
      const listsData = await listService.getAll()
      setLists(listsData)
    } catch (error) {
      console.error("Failed to load lists:", error)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <Select 
        label="List"
        disabled
        className={className}
      >
        <option>Loading lists...</option>
      </Select>
    )
  }
  
  return (
    <Select
      label="List"
      value={value}
      onChange={onChange}
      className={className}
    >
      {lists.map((list) => (
        <option key={list.Id} value={list.Id.toString()}>
          {list.name}
        </option>
      ))}
    </Select>
  )
}

export default ListSelector