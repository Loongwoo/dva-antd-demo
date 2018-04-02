import React from 'react';
import { connect } from 'dva';
import Login from '../pages/Login';


function LoginPage({ location }) {
  return (
    <Login />
  );
}

export default connect()(LoginPage);