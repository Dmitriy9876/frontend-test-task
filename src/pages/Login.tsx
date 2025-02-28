import { useState } from "react";
import { Input, Button, Typography, Flex, Form } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { signIn } from "../utils/api";

const { Title } = Typography;

const LoginContainer = styled(Flex)`
  height: 70vh;
`;

const StyledFormWrapper = styled.div`
  width: 300px;
`;

const StyledFormItem = styled(Form.Item)`
margin-bottom: 10px;
  .ant-form-item-explain {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ username, password }: { username: string; password: string }) => {
    setLoading(true);
    try {
      const status = await signIn(username, password);

      if (status === 200) {
        setTimeout(() => (window.location.href = "/products"), 500);
      }
    } catch (error) {
      setLoading(false);

      form.setFields([
        {
          name: "username",
          errors: ["Неверное имя пользователя или пароль"],
        },
        {
          name: "password",
          errors: [""],
        },
      ]);
    }
  };

  return (
    <LoginContainer justify="center" align="center">
      <Flex vertical align="center">
        <Title level={2}>Вход</Title>
        <StyledFormWrapper>
          <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ width: 300 }} >
            <StyledFormItem
              name="username"
              validateTrigger="onSubmit"
              rules={[
                { required: true, message: "Введите имя пользователя" },
                { min: 2, message: "Имя должно быть не короче 2 символов" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
            </StyledFormItem>

            <StyledFormItem
              name="password"
              validateTrigger="onSubmit"
              rules={[
                { required: true, message: "Введите пароль" },
                { min: 8, message: "Пароль должен быть не менее 8 символов" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
            </StyledFormItem>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </StyledFormWrapper>
      </Flex>
    </LoginContainer>
  );
};

export default Login;