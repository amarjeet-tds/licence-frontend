import { Routes, Route } from "react-router-dom"

import './App.css'
import { ApiPortal } from "./components/apiPortal"
import { Home } from "./components/home"
import { Navigation } from "./components/navigation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <div className="App h-[96vh]">
       <Routes>
        <Route element={<Navigation/>} >
        <Route path="/" element={ <Home/> } />
        <Route path="apiPortal" element={ <ApiPortal/> } />

        </Route>
      </Routes>
      <ToastContainer position="bottom-center" />
    </div>
  )
}

export default App
