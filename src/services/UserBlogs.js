import axios from 'axios';

const baseUrl = 'http://localhost:3001/users';

const updateUserBlogsService = async ({ id, blog }) => {
    const response = await axios.patch(`${baseUrl}/${id}`, {
        blog, // sending the new blog
    });
    return response.data; // 
};

export default { updateUserBlogsService };
