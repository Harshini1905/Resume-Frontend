import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateEmail } from '../ReduxManager/dataStoreSlice'; // Import Redux action to update email

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const dispatch = useDispatch(); // Redux dispatch

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { 
                username, 
                email, 
                password, 
                mobile 
            });
            alert(response.data);

            // Store email in Redux state
            dispatch(updateEmail(email));

            // Store email in localStorage for persistence
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', email);

            // Clear form fields
            setUsername('');
            setEmail('');
            setPassword('');
            setMobile('');
        } catch (error) {
            alert('Error signing up: ' + error.response?.data || error.message);
        }
    };

    return (
        <div style={styles.authFormContainer}>
            <form onSubmit={handleSubmit} style={styles.authForm}>
                <h2 style={styles.formTitle}>Sign Up</h2>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username" 
                    required 
                    style={styles.inputField}
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                    style={styles.inputField}
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                    style={styles.inputField}
                />
                <input 
                    type="text" 
                    value={mobile} 
                    onChange={(e) => setMobile(e.target.value)} 
                    placeholder="Mobile Number" 
                    required 
                    style={styles.inputField}
                />
                <button type="submit" style={styles.submitButton}>Sign Up</button>
            </form>
        </div>
    );
}

const styles = {
    authFormContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
    },
    authForm: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        width: '350px',
        textAlign: 'center',
    },
    formTitle: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    inputField: {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '6px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        transition: '0.3s ease',
    },
    submitButton: {
        width: '100%',
        padding: '12px',
        background: 'linear-gradient(45deg, #667eea, #764ba2)',
        border: 'none',
        color: 'white',
        fontSize: '1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default Signup;
