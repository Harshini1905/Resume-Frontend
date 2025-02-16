import React from 'react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../ReduxManager/dataStoreSlice'; // Import Redux logout action

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction()); // Dispatch logout action to clear Redux state
    localStorage.removeItem('isAuthenticated');  // Clear the authentication status from localStorage
    localStorage.removeItem('userEmail');  // Clear the user email from localStorage
    console.log('Logged out');
    // Optionally, you can redirect the user to the login page or home page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
