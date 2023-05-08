import { useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import blogService from '../services/blogs';

function BlogList({ user, dispatchNotification }) {
  const result = useQuery('blogs', async () => {
    const fetchedBlogs = await blogService.getAll();
    console.log('useQuery...');

    const compareFn = (a, b) => b.likes - a.likes;
    return fetchedBlogs.sort(compareFn);
  });

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation(blogService.create, {
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
    //var response = await blogService.create(blog);
    newBlogMutation.mutate(blog);
    blogFormRef.current.toggleVisibility();
    // const userInfo = {
    //   id: response.user,
    //   name: user.name,
    //   username: user.username,
    // };
    // setBlogs([...blogs, { ...response, user: userInfo }]);
    dispatchNotification('NEWBLOG', blog);
  }

  function handleLikesUpdate(blog) {
    return blog;
    // await blogService.update(blog);
    // const byMostLikes = (a, b) => b.likes - a.likes;
    // const mapUpdatedLikes = b =>
    //   b.id === blog.id ? { ...b, likes: blog.likes } : b;
    // setBlogs(blogs.map(mapUpdatedLikes).sort(byMostLikes));
  }

  function handleRemoveBlog(id) {
    return id;
    // await blogService.destroy(id);
    // const removeDestroyed = blog => blog.id !== id;
    // setBlogs(blogs.filter(removeDestroyed));
  }

  // function blogForm() {
  //   return (
  //     <Togglable
  //       buttonLabel='New blog'
  //       ref={blogFormRef}
  //     >
  //       <BlogForm crateBlogHandle={createBlogHandle} />
  //     </Togglable>
  //   );

  //   async function createBlogHandle(blog) {
  //     //var response = await blogService.create(blog);
  //     // newBlogMutation.mutate(blog);
  //     blogFormRef.current.toggleVisibility();
  //     // const userInfo = {
  //     //   id: response.user,
  //     //   name: user.name,
  //     //   username: user.username,
  //     // };
  //     // setBlogs([...blogs, { ...response, user: userInfo }]);
  //     // dispatchNotification('NEWBLOG', blog);
  //   }
  // }
}

export default BlogList;
