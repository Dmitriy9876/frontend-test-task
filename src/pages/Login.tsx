import { useState, FormEventHandler } from "react";
import axios from "axios";
import { Input, Button, Typography } from "antd";
import styled from "styled-components";

const { Title } = Typography;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const LoginFormWrapper = styled.div`
  width: 300px;
  text-align: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin-bottom: 10px;
`;

const StyledPasswordInput = styled(Input.Password)`
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const { status } = await axios.post(
        "/api/sign_in",
        { username, password },
        { withCredentials: true }
      );

      if (status === 200) {
        setTimeout(() => (window.location.href = "/products"), 500);
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
      alert("Ошибка входа. Проверьте данные.");
    }
  };

  return (
    <LoginContainer>
      <LoginFormWrapper>
        <Title level={2}>Вход</Title>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <StyledPasswordInput
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <StyledButton type="primary" htmlType="submit">
            Войти
          </StyledButton>
        </StyledForm>
      </LoginFormWrapper>
    </LoginContainer>
  );
};

export default Login;