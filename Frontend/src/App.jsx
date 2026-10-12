import { useState } from 'react'
import Home from './Pages/Home'
import { Routes, Route } from "react-router-dom";
import Map from './Pages/Map';
import ServicesPage from './Pages/ServicesPage';
import AboutPage from './Pages/AboutPage';

function App() {
  return (
    <>
    <Routes>
      <Route path = "/" element={<Home/>}/>
       <Route path = "/map" element={<Map/>}/>
        <Route path = "/service" element={<ServicesPage/>}/>
        <Route path = "/about" element={<AboutPage/>}/>
    </Routes>
    </>
  )
}

export default App
