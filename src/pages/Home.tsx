import { Link } from "react-router-dom";
import { FC } from "react";
import { Button, Typography } from "antd";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const HomeContainer = styled.div`
  max-width: 500px;
  margin: 100px auto;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;

const Home: FC = () => (
  <HomeContainer>
    <Title level={1}>Добро пожаловать!</Title>
    <Paragraph>
      Войдите или создайте аккаунт, чтобы просматривать товары.
    </Paragraph>
    <ButtonsContainer>
      <Link to="/login">
        <Button type="primary">Вход</Button>
      </Link>
      <Link to="/register">
        <Button>Регистрация</Button>
      </Link>
    </ButtonsContainer>
  </HomeContainer>
);

export default Home;