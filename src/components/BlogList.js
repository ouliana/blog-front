import { useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import blogService from '../services/blogs';

function BlogList({ user, handleNotification }) {
  const result = useQuery('blogs', async () => {
    const fetchedBlogs = await blogService.getAll();

    const compareFn = (a, b) => b.likes - a.likes;
    return fetchedBlogs.sort(compareFn);
  });

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const likeBlogMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const removeBlogMutation = useMutation(blogService.destroy, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const blogFormRef = useRef();

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = result.data;

  return (
    <>
      <h2>Blogs</h2>

      <Togglable
        buttonLabel='New blog'
        ref={blogFormRef}
      >
        <BlogForm crateBlogHandle={createBlogHandle} />
      </Togglable>

      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikesUpdate={handleLikesUpdate}
          usersOwnBlog={user.username === blog.user.username}
          handleRemove={handleRemoveBlog}
        />
      ))}
    </>
  );

  function createBlogHandle(blog) {
    newBlogMutation.mutate(blog);

    blogFormRef.current.toggleVisibility();
    handleNotification('NEWBLOG', blog);
  }

  function handleLikesUpdate(blog) {
    likeBlogMutation.mutate(blog);
  }

  function handleRemoveBlog(id) {
    removeBlogMutation.mutate(id);
  }
}

export default BlogList;
