import React from 'react';
import UserEditor from '../components/UserEditor';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

function UserAdd({ dispatch }) {

  function handleSubmit(values) {
    console.log('handleSubmit ')
    dispatch({
      type: 'users/create',
      payload: values,
    })
  }

  return (
    <UserEditor onSubmit={ handleSubmit } />
  );
}

export default connect()(UserAdd);