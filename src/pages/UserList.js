import React from 'react';
import PropTypes from 'prop-types'
import { message, Table, Button, Popconfirm } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

function UserList({dispatch, loading, userList}) {

  function handleDel(id) {
    console.log('del ' + id)
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  function handleEdit(user) {
    console.log('edit ' + user.id)
    dispatch({
      type: 'users/saveCurrentUser',
      payload: user
    });

    dispatch(routerRedux.push('/user/edit'))
  }

  const columns = [{
    title: '用户ID',
    dataIndex: 'id'
  },
    {
      title: '用户名',
      dataIndex: 'name'
    },
    {
      title: '性别',
      dataIndex: 'gender'
    },
    {
      title: '年龄',
      dataIndex: 'age'
    },
    {
      title: '操作',
      render: (text, record) => {
        return (
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
          );
      }
    }
  ];

  return (
    <Table
           columns={ columns }
           loading={ loading }
           dataSource={ userList }
           rowKey={ row => row.id } />
    );
}

function mapStateToProps(state) {
  const {userList} = state.users;
  return {
    loading: state.loading.models.users,
    userList
  };
}

export default connect(mapStateToProps)(UserList);