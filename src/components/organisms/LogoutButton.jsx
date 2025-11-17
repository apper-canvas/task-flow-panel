import { useAuth } from "@/layouts/Root"
import { useSelector } from "react-redux"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const LogoutButton = () => {
  const { logout } = useAuth()
  const { isAuthenticated, user } = useSelector(state => state.user)

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={logout}
      className="flex items-center gap-2"
    >
      <ApperIcon name="LogOut" className="h-4 w-4" />
      Logout
    </Button>
  )
}

export default LogoutButton