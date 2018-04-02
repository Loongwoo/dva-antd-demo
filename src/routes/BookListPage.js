import React from 'react';
import { connect } from 'dva';
import BookList from '../pages/BookList';
import MainLayout from '../layouts/MainLayout';

function BookListPage({ location }) {
  return (
    <MainLayout location={ location }>
      <BookList />
    </MainLayout>
  );
}

export default connect()(BookListPage);