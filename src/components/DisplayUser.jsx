import { useUsers } from '../hooks/useUsers';
import { useParams } from 'react-router-dom';

const DisplayUser = () => {
  const { userId } = useParams();
  const { data: users, isLoading, error } = useUsers();

  console.log('isLoading:', isLoading);
  console.log('error:', error);
  console.log('users:', users);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> Error fetching users</div>;

  //   Finding the user by Id
  const user = users.find((u) => u.id === userId);
  if (!user) return <div>User not found</div>

  return (
    <div>
      <h1>{user.name}</h1>
      {/* <strong>{users.user.name}</strong> - {users.user.username} */}
      <h2>Added blogs</h2>
      <ul>
        {user.blogs?.map((blog) => (
          <li key={blog.id}>
            {blog.title} by {blog.author} ({blog.likes} likes)
          </li>
        )) || <p>No blogs added yet</p>}
      </ul>
    </div>
  );
};

export default DisplayUser;
