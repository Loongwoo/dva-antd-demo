import React from 'react';
import { connect } from 'dva';
import Home from '../pages/Home';
import MainLayout from '../layouts/MainLayout';

function HomePage({ location }) {
  return (
    <MainLayout location={ location }>
      <Home />
    </MainLayout>
  );
}

export default connect()(HomePage);