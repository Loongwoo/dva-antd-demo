import request from '../utils/request';

const reload = () => {
  return request('get', '/api/book/');
}

const remove = (id) => {
  return request('delete', `/api/book/${id}`);
}

const patch = (id, values) => {
  return request('put', `/api/book/${id}`, values);
}

const create = (values) => {
  return request('post', '/api/book/', values);
}

export default {
  reload,
  remove,
  patch,
  create
}