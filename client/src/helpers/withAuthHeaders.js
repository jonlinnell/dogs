const token = localStorage.getItem('token');

export default () => {
  if (token) {
    return { headers: { 'x-access-token': token } };
  } else {
    return {};
  }
};
