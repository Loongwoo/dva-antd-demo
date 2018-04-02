import React from 'react';
import { connect } from 'dva';
import BookAdd from '../pages/BookAdd';
import MainLayout from '../layouts/MainLayout';

function BookAddPage({ location }) {
  return (
    <MainLayout location={ location }>
      <BookAdd />
    </MainLayout>
  );
}

export default connect()(BookAddPage);