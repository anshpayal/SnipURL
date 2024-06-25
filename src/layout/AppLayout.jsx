import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div>
        <div>This is Header</div>
        <Outlet/>
        <div>This footer</div>
    </div>
  )
}

export default AppLayout