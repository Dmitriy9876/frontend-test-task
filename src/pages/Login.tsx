import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Typography, Flex, Form, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { signIn } from "../utils/api";

const { Title } = Typography;

const LoginContainer = styled(Flex)`
  width: 300px;
  height: 80vh;
  margin: 0 auto;
  form {
    width: 100%;
  }
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 15px;
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ username, password }: LoginFormValues) => {
    setLoading(true);
    try {
      const status = await signIn(username.trim(), password);

      if (status === 200) {
        navigate("/products");
      }
    } catch (error: any) {
      if (!error.response) {
        message.error("Ошибка сети. Проверьте подключение к интернету.");
      } else if (error.response.status === 401) {
        form.setFields([
          { name: "username", errors: [""] },
          {
            name: "password",
            errors: ["Неверное имя пользователя или пароль"],
          },
        ]);
      } else if (error.response.status / 100 === 5) {
        message.error("Ошибка сервера. Попробуйте позже.");
      } else {
        message.error("Произошла ошибка. Попробуйте еще раз.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer vertical justify="center" align="center">
      <Title level={2}>Вход</Title>
      <Form form={form} onFinish={handleSubmit}>
        <StyledFormItem
          name="username"
          validateTrigger="onSubmit"
          rules={[
            { required: true, message: "Введите имя пользователя" },
            { min: 3, message: "Минимум 3 символа" },
            { max: 30, message: "Максимум 30 символов" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
        </StyledFormItem>

        <StyledFormItem
          name="password"
          validateTrigger="onSubmit"
          rules={[
            { required: true, message: "Введите пароль" },
            { min: 8, message: "Минимум 8 символов" },
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
    </LoginContainer>
  );
};

export default Login;
