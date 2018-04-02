import React from 'react';
import PropTypes from 'prop-types'
import UserEditor from '../components/UserEditor';
import { connect } from 'dva';

function UserEdit({ dispatch, currentUser }) {
  function handleSubmit(values) {
    console.log('handleSubmit ' + currentUser.id)
    dispatch({
      type: 'users/patch',
      payload: {
        id: currentUser.id,
        values: values
      },
    })
  }

  return (
    <div>
      <UserEditor
                  editTarget={ currentUser }
                  onSubmit={ handleSubmit } />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.users.currentUser
  };
}

export default connect(mapStateToProps)(UserEdit);