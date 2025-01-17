import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )  
}

export default App
