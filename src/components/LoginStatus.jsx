import { useState } from 'react';
import { useUser } from '../context/UserContext';
import LoginForm from './LoginForm';
import Togglable from './Togglable';

const LoginStatus = ({ handleLogout, handleLogin }) => {
  const { user } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

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
  return (
    <div>
        <p>
            <em>
              <strong>{user.name}</strong>
            </em>{' '}
            logged-in <button onClick={handleLogout}>logout</button>
          </p>
    </div>
  )
};

export default LoginStatus