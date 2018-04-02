import React from 'react';
import { connect } from 'dva';
import UserAdd from '../pages/UserAdd';
import MainLayout from '../layouts/MainLayout';

function UseAddPage({ location }) {
  return (
    <MainLayout location={ location }>
      <UserAdd />
    </MainLayout>
  );
}

export default connect()(UseAddPage);