import React from 'react';
import { Router } from 'dva/router';

const cached = {};

function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

export default function RouterConfig({ history, app }) {
  const routes = [{
      path: '/',
      name: 'Home',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/HomePage'));
        });
      },
    },
    {
      path: '/login',
      name: 'Login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/LoginPage'));
        });
      },
    },
    {
      path: '/user/list',
      name: 'UserListPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/User'));
          cb(null, require('./routes/UserListPage'));
        });
      },
    },
    {
      path: '/user/add',
      name: 'UserAddPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/UserAddPage'));
        });
      },
    },
    {
      path: '/user/edit',
      name: 'UserEditPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/User'));
          cb(null, require('./routes/UserEditPage'));
        });
      },
    },
    {
      path: '/book/list',
      name: 'BookListPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/Book'));
          cb(null, require('./routes/BookListPage'));
        });
      },
    },
    {
      path: '/book/add',
      name: 'BookAddPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/BookAddPage'));
        });
      },
    },
    {
      path: '/book/edit',
      name: 'BookEditPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/Book'));
          cb(null, require('./routes/BookEditPage'));
        });
      },
    },
  ];

  return <Router
                 history={ history }
                 routes={ routes } />;
}