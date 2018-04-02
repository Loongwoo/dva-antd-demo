import React from 'react';
import PropTypes from 'prop-types'
import BookEditor from '../components/BookEditor';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

function BookEdit({ dispatch, currentBook }) {

  function handleSubmit(values) {
    console.log('handleSubmit ' + currentBook.id)
    dispatch({
      type: 'books/patch',
      payload: {
        id: currentBook.id,
        values: values
      },
    })
  }

  return (
    <div>
      <BookEditor
                  editTarget={ currentBook }
                  onSubmit={ handleSubmit } />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentBook: state.books.currentBook
  };
}

export default connect(mapStateToProps)(BookEdit);