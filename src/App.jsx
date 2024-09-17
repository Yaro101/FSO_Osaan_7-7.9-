import { useState, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import {
  NotificationProvider,
  useNotification,
} from './context/NotificationContext';
import { UserProvider, useUser } from './context/UserContext';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import {
  useBlogs,
  useCreateBlog,
  useDeleteBlog,
  useUpdateBlog,
} from './hooks/useBlogs';
import '../index.css';

const queryClient = new QueryClient();

// console.log(blogService.getAll());

const AppContent = () => {
  const navigate = useNavigate();
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogFormRef = useRef();
  const { notify } = useNotification(); // Use notification context
  const { user, login, logout } = useUser(); // Get user state and functions from UserContext

  // Fetch the blogs using the custoim hook
  const { data: blogs = [], isError, error, isLoading } = useBlogs();
  // Custom hooks for blog mutation
  const createBlogMutation = useCreateBlog();
  const updateBlogMutation = useUpdateBlog();
  const deleteBlogMutation = useDeleteBlog();

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

  // Login mutation
  const handleLogin = async (credentials) => {
    console.log(credentials);
    try {
      const userData = await loginService.login(credentials);
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(userData)
      );
      blogService.setToken(userData.token);
      login(userData);
      notify({ message: 'Login successful', type: 'success' });
      setUsername(''); // Clear username
      setPassword(''); // Clear password
      navigate('/blogs');
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
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();
    const createdBlog = {
      ...newBlog, // the blog data from the form
      user: {
        username: user.username,
        name: user.name,
        id: user.id,
      },
    };

    createBlogMutation.mutate(createdBlog, {
      onSuccess: (newBlog) => {
        setNewBlog({ title: '', author: '', url: '' });
        notify({
          message: `A new blog '${newBlog.title}' by ${newBlog.author} added`,
          type: 'success',
        });
        blogFormRef.current.toggleVisibility();
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
          notify({ message: 'Blog removed successfully', type: 'success' });
        },
        onError: () => {
          notify({ message: 'Failed to remove blog', type: 'error' });
        },
      });
    }
  };

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
        },
        onError: () => {
          notify({ message: 'Failed to update blog likes', type: 'error' });
        },
      }
    );
  };

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // Blog list display with like and delete buttons
  const displayBlogs = () => {
    // console.log('User in displayBlog clg:', user);
    // console.log('Array of blogs retrieved ready', blogs) // Checking if blogs are correctly retrieved
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    if (isLoading) {
      return <div>Loading blogs...</div>; // Loading state
    }

    return (
      <div>
        {user && (
          <p>
            <em>
              <strong>{user.name}</strong>
            </em>{' '}
            logged-in <button onClick={handleLogout}>logout</button>
          </p>
        )}
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

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null && (
        <Togglable buttonLabel="login">
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            username={username}
            password={password}
          />
        </Togglable>
      )}
      {displayBlogs()}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NotificationProvider>
          <Router>
            <AppContent />
          </Router>
        </NotificationProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
