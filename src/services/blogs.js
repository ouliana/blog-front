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
  } catch {
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
  } catch {
    throw new Error('Cannot save blog ');
  }
};

const update = async (id, blogToUpdate) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.put(baseUrl, blogToUpdate, config);
    return response.data;
  } catch {
    throw new Error('Cannot update blog ');
  }
};

const destroy = async id => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.delete(baseUrl, id, config);
    return response.data;
  } catch {
    throw new Error('Cannot delete blog ');
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
