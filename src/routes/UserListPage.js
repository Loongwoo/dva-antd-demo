import React from 'react';
import { connect } from 'dva';
import UserList from '../pages/UserList';
import MainLayout from '../layouts/MainLayout';

function UserListPage({ location }) {
  return (
    <MainLayout location={ location }>
      <UserList />
    </MainLayout>
  );
}

export default connect()(UserListPage);