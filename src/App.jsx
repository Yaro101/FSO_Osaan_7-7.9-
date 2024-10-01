// import { useState, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import { UserProvider } from './context/UserContext';
// import Blog from './components/Blog';
// import Notification from './components/Notification';
// import LoginForm from './components/LoginForm';
// import BlogForm from './components/BlogForm';
// import Togglable from './components/Togglable';
// import LoginStatus from './components/LoginStatus';
import DisplayBlogs from './components/DisplayBlogs';
// import blogService from './services/blogs';
// import userService from './services/UserBlogs';
// import loginService from './services/login';
// import {
//   useBlogs,
//   useCreateBlog,
//   useDeleteBlog,
//   useUpdateBlog,
// } from './hooks/useBlogs';
import '../index.css';
import Layout from './views/Layout';
import DisplayUsers from './components/DisplayUsers';
import DisplayUser from './components/DisplayUser';
import DisplayBlog from './components/DisplayBlog';

const queryClient = new QueryClient();

// console.log(blogService.getAll());
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="users" element={<DisplayUsers />} />
      <Route path="blogs" element={<DisplayBlogs />} />
      <Route path="users/:userId" element={<DisplayUser />} />
      <Route path="blogs/:blogId" element={<DisplayBlog />} />
    </Route>
  )
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
