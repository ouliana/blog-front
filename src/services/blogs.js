import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error('Cannot fetch data');
  }
};

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
  } catch (error) {
    throw new Error('Cannot save blog ');
  }
};

const update = async blog => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/${blog.id}`;
  const blogToUpdate = { ...blog };
  delete blogToUpdate.id;

  try {
    const response = await axios.put(url, blogToUpdate, config);
    return response.data;
  } catch (error) {
    throw new Error('Cannot update blog ');
  }
};

const destroy = async id => {
  const config = {
    headers: { Authorization: token },
  };
  const url = `${baseUrl}/${id}`;

  try {
    const response = await axios.delete(url, config);
    return response.data;
  } catch (error) {
    throw new Error('Cannot remove blog ');
  }
};

const blogService = {
  setToken,
  getAll,
  create,
  update,
  destroy,
};

export default blogService;
