import axios from 'axios';

const baseUrl = 'http://localhost:3001/users';

const login = async (credentials) => {
    // Fetch all users
    const response = await axios.get(baseUrl);
    const users = response.data;
    const user = users.find((u) => u.username === credentials.username);
    return { username: user.username, name: user.name, token: 'fake-jwt-token' };
};

export default { login };
