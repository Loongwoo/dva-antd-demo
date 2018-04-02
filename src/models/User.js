import dva from 'dva';
import usersService from '../services/users'
import { routerRedux } from 'dva/router';

export default {
  namespace: 'users',
  state: {
    currentUser: null,
    userList: []
  },
  reducers: {
    saveList(state, { payload: userList }) {
      return {
        ...state,
        userList
      };
    },
    saveCurrentUser(state, { payload: currentUser }) {
      return {
        ...state,
        currentUser
      };
    },
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      console.log('start get users')
      const userList = yield call(usersService.reload);
      console.log('userList' + userList)
      yield put({
        type: 'saveList',
        payload: userList,
      });
    },
    * remove({ payload: id }, { call, put }) {
      yield call(usersService.remove, id);
      yield put({
        type: 'fetch'
      });
    },
    * patch({ payload: { id, values } }, { call, put }) {
      console.log('patch ' + id)
      yield call(usersService.patch, id, values);
      yield put({
        type: 'fetch'
      });
      yield put(routerRedux.push('/user/list'))
    },
    * create({ payload: values }, { call, put }) {
      console.log('create ' + values.name)
      yield call(usersService.create, values);
      yield put({
        type: 'fetch'
      });
      yield put(routerRedux.push('/user/list'))
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/user/list') {
          dispatch({
            type: 'fetch'
          });
        }
      });
    },
  },
};