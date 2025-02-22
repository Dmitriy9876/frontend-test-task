import { useState, FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Button, Typography } from "antd";
import styled from "styled-components";

const { Title } = Typography;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const RegisterFormWrapper = styled.div`
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setServerError("");

    if (password.length < 8) {
      setPasswordError("Пароль должен содержать минимум 8 символов!");
      return;
    }

    try {
      const response = await axios.post("http://89.191.225.217/api/sign_up", {
        username,
        full_name: fullName.trim(),
        password,
      });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error: any) {
      if (error.response) {
        const errorMsg = error.response.data.detail
          ? error.response.data.detail.map((err: { msg: string }) => err.msg).join("\n")
          : "Проверьте введенные данные.";
        setServerError(errorMsg);
      } else {
        setServerError("Ошибка соединения с сервером.");
      }
    }
  };

  return (
    <RegisterContainer>
      <RegisterFormWrapper>
        <Title level={2}>Регистрация</Title>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            required
          />
          <StyledInput
            type="text"
            placeholder="Полное имя"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <StyledPasswordInput
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <StyledButton type="primary" htmlType="submit">
            Зарегистрироваться
          </StyledButton>

          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
        </StyledForm>
      </RegisterFormWrapper>
    </RegisterContainer>
  );
};

export default Register;