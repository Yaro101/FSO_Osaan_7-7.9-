import { useUsers } from '../hooks/useUsers';

function DisplayUsers() {
  const { data: users, isLoading, error } = useUsers();

  console.log('isLoading:', isLoading);
  console.log('error:', error);
  console.log('users:', users);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> Error fetching users</div>;

  return (
    <div>
      <h1>Users</h1>

      <table className="user-table">
        <thead>
          <tr>
            <th> </th>
            <th>Blogs created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <strong>{user.name}</strong> - {user.username}
              </td>
              <td>{user.blogs ? user.blogs.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayUsers;
