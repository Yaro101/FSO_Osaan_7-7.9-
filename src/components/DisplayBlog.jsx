import {
  useBlogs,
  useUpdateBlog,
  useDeleteBlog,
  useAddComment,
} from '../hooks/useBlogs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

const DisplayBlog = () => {
  const { blogId } = useParams();
  const { data: blogs, isLoading, error } = useBlogs();
  //   Getting the blog with the matching id
  const blog = blogs?.find((b) => b.id.toString() === blogId);

  const updateBlogMutation = useUpdateBlog();
  const deleteBlogMutation = useDeleteBlog();
  const addCommentMutation = useAddComment();
  const { notify } = useNotification();

  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate({ id: blog.id, newBlog: updatedBlog });
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    // Prevent empty comments
    if (!newComment.trim()) {
      return;
    }
    addCommentMutation.mutate(
      { id: blog.id, comment: newComment },
      {
        onSuccess: () => {
          setNewComment(''); // Clear input field
          notify({ message: 'Comment added successfully', type: 'success' });
        },
        onError: () => {
          notify({ message: 'Failed to add comment', type: 'error' });
        },
      }
    );
  };

  const loggedUser = JSON.parse(localStorage.getItem('loggedBlogAppUser'));

  if (isLoading) return <div>Loading...</div>;
  if (error || !blog) return <div>Error fetching blog</div>;

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}{' '}
      </h2>
      <div>
        <p>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </p>
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

        <h3>Comments</h3>

        <ul>
          {blog.comments?.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>

        <form onSubmit={handleAddComment}>
          <input
            type="text"
            value={newComment}
            onChange={({ target }) => setNewComment(target.value)}
            placeholder="Write a comment"
          />
          <button type="submit">Add comment</button>
        </form>
      </div>
    </div>
  );
};

export default DisplayBlog;
