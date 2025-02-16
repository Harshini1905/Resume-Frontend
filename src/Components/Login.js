import React, { useState } from 'react';    //ok
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateEmail } from '../ReduxManager/dataStoreSlice'; // Import Redux action to update email

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Redux dispatch

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page

        try {
            const response = await axios.post('https://resume-backend-2-8p3o.onrender.com/api/auth/login', {
                email,
                password,
            });

            if (response.status === 200) {
                // Store authentication status in localStorage
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', email);

                // Update email in Redux store
                dispatch(updateEmail(email));

                // Clear any error message
                setError('');
                
                if (setIsLoggedIn) {
                    setIsLoggedIn(true); // Ensure setIsLoggedIn is defined before calling
                }

                // Redirect to the home page after successful login
                navigate('/');

                // Refresh the page to update the navbar
                window.location.reload();
            }
        } catch (err) {
            console.error('Error response:', err.response?.data || err.message); // Log error details
            if (err.response && err.response.status === 401) {
                setError('Invalid credentials. Please try again.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    // CSS styles in JS for better component-based styling
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

    return (
        <div style={styles.authFormContainer}>
            <form style={styles.authForm} onSubmit={handleLogin}>
                <h2 style={styles.formTitle}>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.inputField}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.inputField}
                    required
                />
                {error && <div style={styles.errorMessage}>{error}</div>}
                <button type="submit" style={styles.submitButton}>Login</button>
            </form>
        </div>
    );
};

export default Login;
