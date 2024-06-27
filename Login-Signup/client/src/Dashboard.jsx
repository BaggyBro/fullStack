import React, { useEffect, useState } from 'react'
import Login from './Login'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
  const [mes,setMes] = useState()
  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  useEffect(()=>{
    axios.get("http://localhost:8001/dashboard")
    .then(res=>{
      if(res.data.valid){
        setMes(res.data.message)
      }else{
        navigate("/")
      }
    })
  })

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard