import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostDetails } from './pages/PostDetails';
import { CreateProject } from './pages/CreateProject';
import { Home } from './pages/Home'
import { AboutPage } from './pages/AboutPage'
import {Taller} from './pages/Taller';
import { Tegnologia } from './pages/Tegnologia'
import { PracticaSupervisada } from './pages/PracticaSupervisada'
import './index.css'

export default function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home />} />
        <Route path="/add" element={<CreateProject/>} />
        <Route path="/post/:projectId" element={<PostDetails />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path='/taller' element={<Taller/>}/>
        <Route path='/tegnologia' element={<Tegnologia/>}/>
        <Route path='/practicasupervisada' element={<PracticaSupervisada/>}/>
      </Routes>
    </Router>
  );
}
