import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div className=" w-full min-h-screen overflow-hidden">
      <Header />
      <div className="min-h-[100vh] bg-[#212121]">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default AppLayout