import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div className="bg-primary w-full min-h-screen overflow-hidden">
      <Header />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default AppLayout