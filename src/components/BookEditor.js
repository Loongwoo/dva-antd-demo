import React from 'react';
import PropTypes from 'prop-types'
import { Input, InputNumber, Form, Button, AutoComplete, message } from 'antd';
import { GET } from '../utils/request';
import { connect } from 'dva';

const AutoCompleteOption = AutoComplete.Option;
const FormItem = Form.Item;
const formLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
};

class BookEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recommendUsers: []
    }
    this.handleOwnerIdChange = this.handleOwnerIdChange.bind(this)
  }

  componentDidMount() {
    const { editTarget, form } = this.props;
    if (editTarget) {
      form.setFieldsValue(editTarget);
    }
  }

  getRecommendUsers(partialUserId) {
    GET('/api/user?id_like=' + partialUserId)
      .then((res) => {
        if (res.length === 1 && res[0].id === partialUserId) {
          // 如果结果只有1条且id与输入的id一致，说明输入的id已经完整了，没必要再设置建议列表
          return;
        }

        // 设置建议列表
        this.setState({
          recommendUsers: res.map((user) => {
            return {
              text: `${user.id}（${user.name}）`,
              key: user.id
            };
          })
        });
      });
  }

  timer = 0;
  handleOwnerIdChange(value) {
    this.setState({
      recommendUsers: []
    });

    // 使用“节流”的方式进行请求，防止用户输入的过程中过多地发送请求
    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (value) {
      // 200毫秒内只会发送1次请求
      this.timer = setTimeout(() => {
        // 真正的请求方法
        this.getRecommendUsers(value);
        this.timer = 0;
      }, 200);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        message.warn(err);
        return;
      }

      this.props.onSubmit(values)
    });
  }

  render() {
    const { recommendUsers } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const userOptions = recommendUsers.map(user => (
      <AutoCompleteOption key={ user.key }>
        { user.text }
      </AutoCompleteOption>
    ));

    return (
      <form
            onSubmit={ (e) => this.handleSubmit(e) }
            style={ { width: '400px' } }>
        <FormItem
                  label="书名："
                  {...formLayout}>
          { getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入书名'
                }
              ]
            })(<Input type="text" />) }
        </FormItem>
        <FormItem
                  label="价格："
                  {...formLayout}>
          { getFieldDecorator('price', {
              rules: [
                {
                  required: true,
                  message: '请输入价格',
                  type: 'number'
                },
                {
                  min: 1,
                  max: 99999,
                  type: 'number',
                  message: '请输入1~99999的数字'
                }
              ]
            })(<InputNumber/>) }
        </FormItem>
        <FormItem
                  label="所有者："
                  {...formLayout}>
          { getFieldDecorator('owner_id', {
              rules: [
                {
                  required: true,
                  message: '请输入所有者ID'
                },
                {
                  pattern: /^\d*$/,
                  message: '请输入正确的ID'
                }
              ]
            })(
              <AutoComplete
                            dataSource={ userOptions }
                            onChange={ this.handleOwnerIdChange } />
            ) }
        </FormItem>
        <FormItem wrapperCol={ { span: formLayout.wrapperCol.span, offset: formLayout.labelCol.span } }>
          <Button
                  type="primary"
                  htmlType="submit">
            提交
          </Button>
        </FormItem>
      </form>
    );
  }
}

BookEditor = Form.create()(BookEditor);

export default BookEditor;