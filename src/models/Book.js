import dva from 'dva';
import booksService from '../services/books'
import { routerRedux } from 'dva/router';

export default {
  namespace: 'books',
  state: {
    currentBook: null,
    bookList: []
  },
  reducers: {
    saveList(state, { payload: bookList }) {
      return {
        ...state,
        bookList
      };
    },
    saveCurrentBook(state, { payload: currentBook }) {
      return {
        ...state,
        currentBook
      };
    },
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      console.log('start fetch books')
      const bookList = yield call(booksService.reload);
      yield put({
        type: 'saveList',
        payload: bookList
      });
    },
    * remove({ payload: id }, { call, put }) {
      yield call(booksService.remove, id);
      yield put({
        type: 'fetch'
      });
    },
    * patch({ payload: { id, values } }, { call, put }) {
      console.log('patch book ' + id);
      yield call(booksService.patch, id, values);
      yield put({
        type: 'fetch'
      });
      yield put(routerRedux.push('/book/list'))
    },
    * create({ payload: values }, { call, put }) {
      console.log('create book ' + values)
      yield call(booksService.create, values);
      yield put({
        type: 'fetch'
      });
      yield put(routerRedux.push('/book/list'))
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/book/list') {
          dispatch({
            type: 'fetch'
          });
        }
      });
    },
  },
};