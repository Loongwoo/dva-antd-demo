import React from 'react';
import { connect } from 'dva';
import BookEdit from '../pages/BookEdit';
import MainLayout from '../layouts/MainLayout';

function BookEditPage({ location }) {
  return (
    <MainLayout location={ location }>
      <BookEdit />
    </MainLayout>
  );
}

export default connect()(BookEditPage);