import { Form, Button, Input } from 'antd';
import { FC, useRef } from 'react';
import { rules } from '../utils/rules';
import { IUser } from '../models/IUser';
import { useAction } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';
import type { FormInstance } from 'antd/es/form';

const LoginForm: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>(null);
  const { login } = useAction();
  const { isLoading, error, isAuth } = useTypedSelector(state => state.auth);

  const handlerSubmit = (values: IUser) => {
    login(values.username, values.password);
    formRef.current?.resetFields();
  }

  return (
    <Form
      ref={formRef}
      onFinish={handlerSubmit}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      {error && <div style={{color: "red"}}>
        { error }
      </div> }
      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required("Please input your username")]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[rules.required("Please input your password")]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Sign in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm;
