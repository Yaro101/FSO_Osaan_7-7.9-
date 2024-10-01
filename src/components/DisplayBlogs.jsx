import { useState, useEffect, useRef } from 'react';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import Blog from './Blog';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  useBlogs,
  useCreateBlog,
  useDeleteBlog,
  useUpdateBlog,
} from '../hooks/useBlogs';
import blogService from '../services/blogs';
import userService from '../services/UserBlogs'; // ***
import { QueryClient } from '@tanstack/react-query'; // ***
import { useNotification } from '../context/NotificationContext';
import { Table } from 'react-bootstrap';

const DisplayBlogs = () => {
  const navigate = useNavigate();
  const { user, login } = useUser(); // Get user state and functions from UserContext
  const { notify } = useNotification(); // Use notification context
  const blogFormRef = useRef();
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  // console.log('Array of blogs retrieved ready', blogs) // Checking if blogs are correctly retrieved

  // Fetch the blogs using the custoim hook
  const { data: blogs = [], isError, error, isLoading } = useBlogs();
  // Custom hooks for blog mutation
  const createBlogMutation = useCreateBlog();
  const updateBlogMutation = useUpdateBlog();
  const deleteBlogMutation = useDeleteBlog();

  //   Get queryClient to invalidate and refresh queries
  const queryClient = new QueryClient();

  // Effect to check if user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    console.log('Logged user JSON:', loggedUserJSON); // Log the raw JSON
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON);
        console.log('Parsed user:', user); // Log the parsed user object
        login(user);
        blogService.setToken(user.token);
        navigate('/blogs'); // If user logged in navigate to /blogs
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, []); // if used with login as the argument [login] it creates an infinite loop!

  useEffect(() => {
    if (isError) {
      console.error('Error fetching blogs:', error);
    }
  }, [isError, error]);

  const handleCreateBlog = (event) => {
    event.preventDefault();
    console.log('Current user:', user);
    const createdBlog = {
      ...newBlog, // the blog data from the form
      likes: 0,
      user: {
        username: user.username,
        name: user.name,
        id: user.id,
      },
    };

    createBlogMutation.mutate(createdBlog, {
      onSuccess: async (newBlog) => {
        setNewBlog({ title: '', author: '', url: '' });
        console.log('Blog created successfully:', newBlog);
        notify({
          message: `A new blog '${newBlog.title}' by ${newBlog.author} added`,
          type: 'success',
        });
        // Close the blog creation form
        blogFormRef.current.toggleVisibility();

        // Updating the user's blog in the backend/db
        const updateUserBlogs = {
          id: user.id, // User id
          blog: newBlog, // Newly created blog
        };

        await userService.updateUserBlogsService(updateUserBlogs);

        // Updating the user's blogs in the backend/db
        const updateUser = {
          ...user,
          blogs: [...user.blogs, newBlog], // Adding the new blog to the user's blogs list
        };

        // Updating the user in localStorage
        window.localStorage.setItem(
          'loggedAppUser',
          JSON.stringify(updateUser)
        );

        // Updating user context
        login(updateUser);

        // refresh the blog list
        queryClient.invalidateQueries('blogs');
      },
      onError: () => {
        notify({ message: 'Failed to create a new bolg', type: 'error' });
      },
    });
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlogMutation.mutate(id, {
        onSuccess: () => {
          console.log('Deleting blog...');
          notify({ message: 'Blog removed successfully', type: 'success' });
          queryClient.invalidateQueries('blogs');
        },
        onError: () => {
          notify({ message: 'Failed to remove blog', type: 'error' });
        },
      });
    }
  };

  //   Handle updating -> blog likes increment
  const handleUpdateBlog = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate(
      { id: blog.id, newBlog: updatedBlog },
      {
        onSuccess: () => {
          notify({
            message: 'Blog likes updated successfully',
            type: 'success',
          });
          queryClient.invalidateQueries('blogs');
        },
        onError: () => {
          notify({ message: 'Failed to update blog likes', type: 'error' });
        },
      }
    );
  };

  // Sort blogs based on likes
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  if (isLoading) {
    return <div>Loading blogs...</div>; // Loading state
  }

  return (
    <div>
      <br />
      {user && (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            onSubmit={handleCreateBlog}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
          />
        </Togglable>
      )}
      <br />
      <Table striped bordered hover>
        <tbody>
          {sortedBlogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLike={() => handleUpdateBlog(blog)}
                  handleDelete={() => handleDeleteBlog(blog.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayBlogs;
