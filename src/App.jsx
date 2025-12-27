import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navlist from './components/Navlist'
import Footer from './components/Footer'

import Home from './pages/Home/Home'
import Business from './pages/Business/Business'
import Culture from './pages/Culture/Culture'
import Innovation from './pages/Innovation/Innovation'
import Newsdetails from './pages/Newsdetails/Newsdetails'
import Sports from './pages/Sports/Sports'
import Travel from './pages/Travel/Travel'
import Pagenotfound from './pages/pagenotfound/Pagenotfound'
import Arts from "./pages/Arts/Arts"
import News from "./pages/News/News"
import Search from "./pages/Search/Search"

function App() {
  return (
    <>
      <Navlist />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/news' element={<News />} />
        <Route path='/category/business' element={<Business />} />
        <Route path='/category/culture' element={<Culture />} />
        <Route path='/category/innovation' element={<Innovation />} />
        <Route path='/category/sports' element={<Sports />} />
        <Route path='/category/travel' element={<Travel />} />
        <Route path='/category/arts' element={<Arts />} />
        <Route path="/news/:id" element={<Newsdetails />} />
        <Route path="/search" element={<Search />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App