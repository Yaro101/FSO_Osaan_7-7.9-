import axios from 'axios';

const baseUrl = 'http://localhost:3001/users';

// Fetch all users
const getAllUsers = async () =>{
    const response = await axios.get(baseUrl)
    return response.data
}

// Update user blog services
const updateUserBlogsService = async ({ id, blog }) => {
    const response = await axios.patch(`${baseUrl}/${id}`, {
        blog, // sending the new blog
    });
    return response.data; // 
};

export default { getAllUsers, updateUserBlogsService };
