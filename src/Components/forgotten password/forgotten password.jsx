import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
                email: email
            });
            setMessage(response.data.message);
            navigate('/reset-code');
        } catch (error) {
            console.error('An error occurred:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='w-75 m-auto my-5'>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control mb-3' />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgotPassword;
