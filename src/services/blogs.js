import axios from 'axios';
const baseUrl = '/api/blogs';

// public API
const blogService = {
  setToken,
  getAll,
  create,
  update,
  destroy,
};

export default blogService;

// implementation

var token = null;

function setToken(newToken) {
  token = `bearer ${newToken}`;
}

async function getAll() {
  try {
    var response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error('Cannot fetch data');
  }
}

async function create(newBlog) {
  const config = {
    headers: { Authorization: token },
  };

  try {
    var response = await axios.post(baseUrl, newBlog, config);
    return response.data;
  } catch (error) {
    throw new Error('Cannot save blog ');
  }
}

async function update(blog) {
  const config = {
    headers: { Authorization: token },
  };
  const url = `${baseUrl}/${blog.id}`;

  var blogToUpdate = { ...blog };
  delete blogToUpdate.id;

  try {
    let response = await axios.put(url, blogToUpdate, config);
    return response.data;
  } catch (error) {
    throw new Error('Cannot update blog ');
  }
}

async function destroy(id) {
  const config = {
    headers: { Authorization: token },
  };
  const url = `${baseUrl}/${id}`;

  try {
    let response = await axios.delete(url, config);
    return response.data;
  } catch (error) {
    throw new Error('Cannot remove blog ');
  }
}
