import { useState } from 'react';
import { useUpdateBlog, useDeleteBlog } from '../hooks/useBlogs';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const updateBlogMutation = useUpdateBlog();
  const deleteBlogMutation = useDeleteBlog();

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate(
        { id: blog.id, newBlog: updatedBlog }
    );
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const blogStyle = {
    padding: 10,
    border: 'solid grey',
    borderWidth: 1,
    marginBottom: 5,
  };

  const loggedUser = JSON.parse(localStorage.getItem('loggedBlogAppUser'));

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button className="show-hide-btn" onClick={toggleVisibility}>
          {visible ? 'hide' : 'show'}
        </button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <div>
            Likes <span className="like-count">{blog.likes}</span>{' '}
            <button className="like-btn" onClick={handleLike}>
              like
            </button>
          </div>
          <p>{blog.user.name}</p>
          {loggedUser && blog.user.username === loggedUser.username && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
