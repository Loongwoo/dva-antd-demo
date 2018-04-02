import React from 'react';
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;

const formLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  },
};

class UserEditor extends React.Component {
  componentDidMount() {
    const { editTarget, form } = this.props;
    if (editTarget) {
      form.setFieldsValue(editTarget);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      } else {
        message.warn(err);
      }
    });
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div style={ { width: '400px' } }>
        <Form onSubmit={ (e) => this.handleSubmit(e) }>
          <FormItem
                    label="用户名："
                    {...formLayout}>
            { getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名'
                  },
                  {
                    pattern: /^.{1,4}$/,
                    message: '用户名最多4个字符'
                  }
                ]
              })(
                <Input type="text" />
              ) }
          </FormItem>
          <FormItem
                    label="年龄："
                    {...formLayout}>
            { getFieldDecorator('age', {
                rules: [
                  {
                    required: true,
                    message: '请输入年龄',
                    type: 'number'
                  },
                  {
                    min: 1,
                    max: 100,
                    message: '请输入1~100的年龄',
                    type: 'number'
                  }
                ]
              })(
                <InputNumber/>
              ) }
          </FormItem>
          <FormItem
                    label="性别："
                    {...formLayout}>
            { getFieldDecorator('gender', {
                initialValue: 'male',
                rules: [
                  {
                    required: true,
                    message: '请选择性别'
                  }
                ]
              })(
                <Select
                        placeholder="请选择"
                        onChange={ this.handleChange.bind(this) }>
                  <Option value="male">
                    男
                  </Option>
                  <Option value="female">
                    女
                  </Option>
                </Select>
              ) }
          </FormItem>
          <FormItem wrapperCol={ { ...formLayout.wrapperCol, offset: formLayout.labelCol.span } }>
            <Button
                    type="primary"
                    htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

UserEditor = Form.create()(UserEditor);

export default UserEditor;