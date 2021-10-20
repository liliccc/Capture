import axios from 'axios';

export const signup = (user) => {
  return axios.post('/api/1.0/users', user);
};

export const login = (user) => {
  return axios.post('/api/1.0/login', {}, { auth: user });
};

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
  if (isLoggedIn) {
    axios.defaults.headers.common['Authorization'] = `Basic ${btoa(
      username + ':' + password
    )}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const listUsers = (param = { page: 0, size: 3 }) => {
  const path = `/api/1.0/users?page=${param.page || 0}&size=${param.size || 3}`;
  return axios.get(path);
};

export const getUser = (username) => {
  return axios.get(`/api/1.0/users/${username}`);
};

export const updateUser = (userId, body) => {
  return axios.put('/api/1.0/users/' + userId, body);
};

export const postMessage = (Message) => {
  return axios.post('/api/1.0/msg', Message);
};

export const loadMessages = (username) => {
  const basePath = username
    ? `/api/1.0/users/${username}/msg`
    : '/api/1.0/msg';
  return axios.get(basePath + '?page=0&size=5&sort=id,desc');
};

export const loadOldMessages = (MessageId, username) => {
  const basePath = username
    ? `/api/1.0/users/${username}/msg`
    : '/api/1.0/msg';
  const path = `${basePath}/${MessageId}?direction=before&page=0&size=5&sort=id,desc`;
  return axios.get(path);
};

export const loadNewMessages = (MessageId, username) => {
  const basePath = username
    ? `/api/1.0/users/${username}/msg`
    : '/api/1.0/msg';
  const path = `${basePath}/${MessageId}?direction=after&sort=id,desc`;
  return axios.get(path);
};

export const loadNewMessageCount = (MessageId, username) => {
  const basePath = username
    ? `/api/1.0/users/${username}/msg`
    : '/api/1.0/msg';
  const path = `${basePath}/${MessageId}?direction=after&count=true`;
  return axios.get(path);
};

export const deleteMessage = (MessageId) => {
  return axios.delete('/api/1.0/msg/' + MessageId);
};
