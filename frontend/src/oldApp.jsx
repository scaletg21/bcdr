import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import './App.scss'
import {HashRouter as Router, Routes, Route} from "react-router-dom"
//import { About } from './pages/About'
//import { Contact } from './pages/Contact'
//import { CreateBlog } from './pages/CreateBlog'
//import { Home } from './pages/Home'
//import { Landing } from './pages/Landing'
//import { Profile } from './pages/Profile'
//import { ReadBlog } from './pages/ReadBlog'
//import { Navbar } from './components/Navbar'
//import { Layout } from  './components/Layout'
//import { useEffect } from 'react'
import axios from "axios"

function App() {
  
  const [data, setData] = useState()

  useEffect(() => {
    async function grabData() {
      //const response = await axios.get("http://165.22.47.81:3000/questions/67d1d60f6d185dde0e8b2c3d")
      const response = await axios.get("http://165.22.47.81:3000/questions/")
      //console.log(response)
      if (response.status === 200) {
        setData(response.data)
      }
    }

    grabData()
  }, [])
  return (
    <>
      {JSON.stringify(data)}

    </>
  )
}

export default App
