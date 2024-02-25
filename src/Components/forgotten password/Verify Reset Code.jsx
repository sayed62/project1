import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyResetCode() {
    const [resetCode, setResetCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
                resetCode: resetCode
            });
            setMessage(response.data.message);
            navigate('/update-password');
        } catch (error) {
            console.error('An error occurred:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='w-75 m-auto my-5'>
            <h2>Verify Reset Code</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Reset Code:</label>
                    <input type="text" value={resetCode} onChange={(e) => setResetCode(e.target.value)} className='form-control mb-3' />
                </div>
                <button type="submit">Verify Code</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default VerifyResetCode;
