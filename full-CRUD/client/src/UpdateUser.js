import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/${id}`);
                const userData = response.data[0];
                setName(userData.name);
                setEmail(userData.email);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address (must contain "@" and only lowercase letters).');
            return;
        }

        try {
            await axios.put(`http://localhost:9999/update/${id}`, { name, email });
            navigate('/');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const isValidEmail = (email) => {
        const regex = /^[a-z]+@[a-z]+\.[a-z]+$/;
        return regex.test(email);
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label>Name</label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            className='form-control'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Email</label>
                        <input
                            type='text'
                            placeholder='Enter Email'
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success' onClick={handleSubmit}>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
