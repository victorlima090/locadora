
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import { Home, MainContainer } from './pages'
import { Users } from './pages/users'
import { Movies } from './pages/movies'

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContainer/>}>
          <Route index element={<Home/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/movies' element={<Movies/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

