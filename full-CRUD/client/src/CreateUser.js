import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateUser() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event)=>{
        event.preventDefault()
        axios.post('http://localhost:9999/create',{name,email})
        .then(res=>{
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err))
    }


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center' >
        <div className='w-50 bg-white rounded p-3' >
            <form>
                <h2>Add User</h2>
                <div className='mb-2' >
                    <label>Name</label>
                    <input type='text' placeholder='Enter Name' className='form-control' 
                        onChange={e=>setName(e.target.value)}/>
                </div>
                <div className='mb-2' >
                    <label>Email</label>
                    <input type='text' placeholder='Enter Name' className='form-control'
                        onChange={e=> setEmail(e.target.value)} />
                </div>
                
                <button className='btn btn-success' onClick={handleSubmit} >Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateUser