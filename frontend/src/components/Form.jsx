import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import "../styles/Form.css"
import LoadingIndicator from './LoadingIndicator';


// ✅ Reusable Form component for both Login and Register
const Form = ({ route, method }) => {
    // 🔹 State for username, password, and loading status
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 🔹 Dynamic name based on method (login/register)
    const name = method === "login" ? "Login" : "Register";

    // 🔹 Handles form submission for login or registration
    const handleSubmit = async (e) => {
        setLoading(true); // Show loading state
        e.preventDefault(); // Prevent default form reload
        
        try {
            // ✅ Send POST request to login/register endpoint
            const res = await api.post(route, { username, password });

            if (method === "login") {
                // 🔹 On successful login, store tokens in localStorage
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/"); // Redirect to home page
            } else {
                // 🔹 On successful registration, navigate to login page
                navigate("/login");
            }
        } catch (error) {
            alert(error); // Show error alert
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    return (
        // ✅ Form UI
        <form onSubmit={handleSubmit} className='form-container'>
            <h1>{name}</h1>

            {/* Username input field */}
            <input 
                type="text" 
                className='form-input' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder='Username'
            />

            {/* Password input field */}
            <input 
                type="password" 
                className='form-input' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder='Password'
            />
            {loading && <LoadingIndicator/>}
            {/* Submit button */}
            <button className='form-button' type='submit' disabled={loading}>
                {loading ? "Processing..." : name}
            </button>
        </form>
    );
}

export default Form;
