import axios from 'axios';
const baseUrl = 'http://localhost:3001/blogs';

let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = async (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return response.data;
};

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    // console.log('Remove response:', response.data);
    return response.data;
};

const addComment = async (id, comment) => {
    // Fetch the specific blog
    const blogResponse = await axios.get(`${baseUrl}/${id}`)
    const blogToAddComment = blogResponse.data // Getting the blog data
    if (blogToAddComment) {
        blogToAddComment.comments = blogToAddComment.comments || [] // initialize if undefined
        blogToAddComment.comments.push(comment)
        const response = await axios.put(`${baseUrl}/${id}`, blogToAddComment)
        return response.data
    }
    throw new Error('Bolg not found')
}

export default { getAll, create, update, remove, setToken, addComment };
