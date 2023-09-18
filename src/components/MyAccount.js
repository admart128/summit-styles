import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext'; // Make sure this path is correct
import { useNavigate } from "react-router-dom"; // Make sure this path is correct

const MyAccount = () => {


     const navigate = useNavigate(); // Define navigate function
    const { username, setUsername } = useContext(UserContext); // Destructure setUsername from UserContext
  
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/logout`,
                {},
                { withCredentials: true }
            );
            console.log('Logout post request successful', res.data);
            setUsername(null); // Reset the username in global context
            navigate("/");
        } catch (error) {
            console.log('Logout post request failed', error);
        }
    };

    const loginUser = async (username, password) => {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/login`,
            { username, password },
            { withCredentials: true }
          );
          setUsername(username);
          navigate("/");
        } catch (error) {
          console.log('Login post request failed', error);
        }
      };
      
      const handleLogin = async (e) => {
        e.preventDefault();
        loginUser(loginUsername, loginPassword);
      };
      
      const handleRegister = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/register`,
            { username: registerUsername, password: registerPassword },
            { withCredentials: true }
          );
          console.log('Register post request successful', res.data);
          loginUser(registerUsername, registerPassword);
        } catch (error) {
          console.log('Register post request failed', error);
        }
      };
      

    return (
        <div>
            {username ? (
                <div>
                <h1>Sign Out</h1>
                <p>You are signed in as <span style={{ fontWeight: 'bold' }}>{username}</span>.</p>
                <button onClick={handleLogout}>Sign Out</button>
                </div>

            ) : (
                null) }
            {username ? (
                <h1>Switch Accounts</h1>
            ) : (
            <h1>Sign In</h1>
            )}
            {username ? (
               <p>Enter a different username and password to switch accounts.</p>

            ) :
            <p>Welcome back! Enter your username and password to sign in.</p>
            }
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button type="submit">Sign In</button>
                 {/* put error message here */}
            </form>
            <h1>Register</h1>
            { username ? (  
            <p>Want to make a new account? Enter a username and password to register.</p>
            ) : (
            <p>Don't have an account? Enter a username and password to register.</p>
            )}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button type="submit">Register</button>
                {/* put error message here */}
            </form>
        </div>
    );
};

export default MyAccount;