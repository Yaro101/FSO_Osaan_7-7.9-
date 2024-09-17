import PropTypes from 'prop-types';

const LoginForm = ({
  handleSubmit: handleFormSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleFormSubmit({ username, password });
  };

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
