import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Models from "./pages/Models"
import ModelDetail from "./pages/ModelDetail"
import "./App.css"
import Sidebar from "./components/Sidebar"



function App() {

  return (
    <div className="app">
      <Sidebar />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/:id" element={<ModelDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

    </div>
  )
}

export default App
