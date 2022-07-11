import { Route, Routes } from "react-router-dom"
import Navbar1 from "./components/Navbar/Navbar"
import Router from "./components/Router/Router"
import PageFooter from "./components/PageFooter"
import "./index.css"


function App() {

    return (
        <div className="root-content">
        <Navbar1 />
        <div className="content-wrapper">
        <Router />
        </div>
        <PageFooter />
        
        </div>
    )
}

export default App