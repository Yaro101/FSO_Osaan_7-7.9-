import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useNotification } from '../context/NotificationContext';
import LoginForm from './LoginForm';
import Togglable from './Togglable';
import blogService from '../services/blogs';
import loginService from '../services/login';

const LoginStatus = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useUser();
  const { notify } = useNotification();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle input changes
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (credentials) => {
    console.log(credentials);
    try {
      const userData = await loginService.login(credentials);
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(userData)
      );
      blogService.setToken(userData.token); // Set the token authentication request
      login(userData); // Update user in context
      notify({ message: 'Login successful', type: 'success' });
      setUsername(''); // Clear username
      setPassword(''); // Clear password
      navigate('/blogs'); // Naavigate to blogs after successful login
    } catch (error) {
      if (error.response && error.response.status === 401) {
        notify({ message: 'wrong username or password', type: 'error' });
      } else {
        notify({ message: 'wrong username or password', type: 'error' });
      }
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    blogService.setToken(null);
    logout();
    notify({ message: 'Logged out', type: 'success' });
    navigate('/');
  };

  //   If user not logged in show the login form
  if (!user) {
    return (
      <div>
        <Togglable buttonLabel="login">
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            username={username}
            password={password}
          />
        </Togglable>
      </div>
    );
  }
  //   If user is logged in show logout button and status
  return (
    <div>
      <p>
        <em>
          <strong>{user.name}</strong>
        </em>{' '}
        logged-in <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );
};

export default LoginStatus;
