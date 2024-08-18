import { Routes, Route } from "react-router-dom"

import './App.css'
import { ApiPortal } from "./components/apiPortal"
import { Home } from "./components/home"
import { Navigation } from "./components/navigation"

function App() {

  return (
    <div className="App h-[100vh]">
       <Routes>
        <Route element={<Navigation/>} >
        <Route path="/" element={ <Home/> } />
        <Route path="apiPortal" element={ <ApiPortal/> } />

        </Route>
      </Routes>
    </div>
  )
}

export default App
