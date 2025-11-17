import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout