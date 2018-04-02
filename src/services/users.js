import request from '../utils/request';

const reload = () => {
  return request('get', '/api/user/');
}

const remove = (id) => {
  return request('delete', `/api/user/${id}`);
}

const patch = (id, values) => {
  return request('put', `/api/user/${id}`, values);
}

const create = (values) => {
  return request('post', '/api/user/', values);
}

export default {
  reload,
  remove,
  patch,
  create
}