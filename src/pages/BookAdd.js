import React from 'react';
import BookEditor from '../components/BookEditor';
import { connect } from 'dva';

function BookAdd({ dispatch }) {

  function handleSubmit(values) {
    console.log('handleSubmit ')
    dispatch({
      type: 'books/create',
      payload: values,
    })
  }

  return (
    <BookEditor onSubmit={ handleSubmit } />
  );
}

export default connect()(BookAdd);