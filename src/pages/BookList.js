import React from 'react';
import { message, Table, Button, Popconfirm } from 'antd';
import { get, del } from '../utils/request';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

function BookList({dispatch, loading, bookList}) {

  function handleDel(id) {
    console.log('handleDel ' + id)
    dispatch({
      type: 'books/remove',
      payload: id,
    });
  }

  function handleEdit(book) {
    dispatch({
      type: 'books/saveCurrentBook',
      payload: book
    });

    dispatch(routerRedux.push('/book/edit'))
  }

  const columns = [{
    title: '图书ID',
    dataIndex: 'id'
  },
    {
      title: '书名',
      dataIndex: 'name'
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (text, record) => <span>¥{ record.price / 100 }</span>
    },
    {
      title: '所有者ID',
      dataIndex: 'owner_id'
    },
    {
      title: '操作',
      render: (text, record) => (
        <Button.Group type="ghost">
          <Button
                  icon="edit"
                  onClick={ handleEdit.bind(null, record) }>
            编辑
          </Button>
          <Popconfirm
                      title="确定要删除吗？"
                      onConfirm={ handleDel.bind(null, record.id) }>
            <Button icon="delete">
              删除
            </Button>
          </Popconfirm>
        </Button.Group>
      )
    }
  ];

  return (
    <Table
           columns={ columns }
           loading={ loading }
           dataSource={ bookList }
           rowKey={ row => row.id } />
    );
}

function mapStateToProps(state) {
  const {bookList} = state.books;
  return {
    loading: state.loading.models.books,
    bookList
  };
}

export default connect(mapStateToProps)(BookList);