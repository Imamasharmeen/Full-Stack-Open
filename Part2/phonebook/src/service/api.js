import axios from 'axios';

const baseUrl = 'http://localhost:3002/persons';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
};
const update = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then(response => response.data);
};


export default {
  getAll,
  create,
  remove,
  update
 
};


// import axios from 'axios';

// const baseUrl = 'http://localhost:3002/persons';

// const getAll = () => axios.get(baseUrl).then(res => res.data);
// const create = (newObject) => axios.post(baseUrl, newObject).then(res => res.data);
// const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data);
// const remove = (id) => axios.delete(`${baseUrl}/${id}`);

// export default { getAll, create, update, remove };
