import React from 'react';
import PropTypes from 'prop-types'
import { Icon, Form, Input, Button, message } from 'antd';
import { POST } from '../utils/request';
import style from '../styles/login-page.less';
import { routerRedux, browserHistory } from 'dva/router';
import { connect } from 'dva';

const FormItem = Form.Item;

class Login extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        POST('/api/login', values)
          .then((res) => {
            if (res) {
              message.info('登录成功');
              browserHistory.push('/');
            } else {
              message.info('登录失败，账号或密码错误');
            }
          });
      }
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={ style.wrapper }>
        <div className={ style.body }>
          <header className={ style.header }>
            ReactManager
          </header>
          <section className={ style.form }>
            <Form onSubmit={ this.handleSubmit }>
              <FormItem>
                { getFieldDecorator('account', {
                    initialValue: "admin",
                    rules: [
                      {
                        required: true,
                        message: '请输入管理员账号',
                        type: 'string'
                      }
                    ]
                  })(
                    <Input
                           type="text"
                           placeholder="请输入账号"
                           addonBefore={ <Icon type="user" /> } />
                  ) }
              </FormItem>
              <FormItem>
                { getFieldDecorator('password', {
                    initialValue: "123456",
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                        type: 'string'
                      }
                    ]
                  })(
                    <Input
                           type="password"
                           placeholder="请输入密码"
                           addonBefore={ <Icon type="lock" /> } />
                  ) }
              </FormItem>
              <Button
                      className={ style.btn }
                      type="primary"
                      htmlType="submit">
                Sign In
              </Button>
            </Form>
          </section>
        </div>
      </div>
    );
  }
}

Login = Form.create()(Login);

export default Login;