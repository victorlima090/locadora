import { Outlet } from "react-router-dom"
import { Header } from "./Header"

export const MainContainer : React.FC = () => {
    return (
    <>
    <Header/>
    <Outlet/>
    </>
    )
}