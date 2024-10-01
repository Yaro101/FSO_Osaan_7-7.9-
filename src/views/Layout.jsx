import { NavLink, Outlet } from 'react-router-dom';
import LoginStatus from '../components/LoginStatus';

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <h1>Blog App</h1>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/users">Users</NavLink>
          <LoginStatus />
        </nav>
      </header>
      <main>
        <h1>Blogs</h1>
        <Outlet />
      </main>
      <footer> © 2024 My Blog App </footer>
    </div>
  );
};

export default Layout;
