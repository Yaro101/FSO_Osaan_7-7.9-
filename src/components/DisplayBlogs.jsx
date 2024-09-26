import { useRef } from 'react';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import Blog from './Blog';

const DisplayBlogs = ({
  user,
  blogs,
  isLoading,
  newBlog,
  setNewBlog,
  handleCreateBlog,
  handleUpdateBlog,
  handleDeleteBlog,
}) => {
  const blogFormRef = useRef();
  // console.log('Array of blogs retrieved ready', blogs) // Checking if blogs are correctly retrieved

  // Sort blogs based on likes
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  if (isLoading) {
    return <div>Loading blogs...</div>; // Loading state
  }

  return (
    <div>
      {user && (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            onSubmit={handleCreateBlog}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
          />
        </Togglable>
      )}
      <div>
        <br />
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => handleUpdateBlog(blog)}
            handleDelete={() => handleDeleteBlog(blog.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayBlogs