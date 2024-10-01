import { useBlogs, useUpdateBlog, useDeleteBlog } from '../hooks/useBlogs';
import { useParams } from 'react-router-dom';

const DisplayBlog = () => {
  const { blogId } = useParams();
  const { data: blogs, isLoading, error } = useBlogs();
  //   Getting the blog with the matching id
  const blog = blogs?.find((b) => b.id === blogId);

  const updateBlogMutation = useUpdateBlog();
  const deleteBlogMutation = useDeleteBlog();

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate({ id: blog.id, newBlog: updatedBlog });
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const loggedUser = JSON.parse(localStorage.getItem('loggedBlogAppUser'));

  if (isLoading) return <div>Loading...</div>
  if (error || !blog) return <div>Error fetching blog</div>

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}{' '}
      </h2>
      <div>
        <p><a href={blog.url}>{blog.url}</a></p>
        <div>
          Likes <span className="like-count">{blog.likes}</span>{' '}
          <button className="like-btn" onClick={handleLike}>
            like
          </button>
        </div>
        <p>Added by {blog.user.name}</p>
        {loggedUser && blog.user.username === loggedUser.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  );
};

export default DisplayBlog;
