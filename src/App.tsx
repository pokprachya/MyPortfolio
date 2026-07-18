import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Blog from './pages/Blog'

export default function App() {
  return (
    <BrowserRouter basename="/MyPortfolio">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  )
}
