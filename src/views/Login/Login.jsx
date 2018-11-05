import React from 'react'
import './Login.scss'
import { connect } from 'react-redux'
// 引入antd相关组件
import { Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        // 在这里跳转路由
        this.props.history.push('/')
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return(
      <div className="LoginPage">
        <div className="form-wrapper">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="https://www.baidu.com">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="https://www.baidu.com">register now!</a>
            </FormItem>
          </Form>
        </div>      
      </div>
    )
  }
}

export default connect()(Form.create()(Login));