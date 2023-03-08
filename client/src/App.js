import React from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/auth' element={<Auth/>} ></Route>
      </Routes>
    </Router>
  )
}

export default App

