import React from 'react';
import { connect } from 'dva';
import UserEdit from '../pages/UserEdit';
import MainLayout from '../layouts/MainLayout';

function UserEditPage({ location }) {
  return (
    <MainLayout location={ location }>
      <UserEdit />
    </MainLayout>
  );
}

export default connect()(UserEditPage);