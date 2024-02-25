import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api';
import './Login.css';

export const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/auth/login', credentials);
            alert('Login successful');
            
            localStorage.setItem('token', response.data.token);
            navigate("/");
        } catch (error) {
            if (error.response) {

                alert(error.response.data.message);
            } else if (error.request) {

                console.log(error.request);
            } else {

                console.log('Error', error.message);
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
    
    
};
