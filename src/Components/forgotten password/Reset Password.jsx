import axios from 'axios';
import React, { useState } from 'react';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetCode] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setMessage('Passwords do not match.');
        return;
    }

    try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        password: password,
        resetCode: resetCode
        });
        setMessage(response.data.message);
        navigator('/project1')
    } catch (error) {
        console.error('An error occurred:', error);
        setMessage('An error occurred. Please try again later.');
    }
    };

    return (
    <div className='w-75 m-auto my-5'>
        <h2>update Password</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label>New Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-control mb-3' />
        </div>
        <div>
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='form-control mb-3' />
        </div>
        <button type="submit" className='btn btn-dark rounded'>update password</button>
        </form>
        {message && <p>{message}</p>}
    </div>
    );
}

export default ResetPassword;
