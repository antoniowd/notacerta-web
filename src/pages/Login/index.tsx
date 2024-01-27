import { Form, Input, Button, Typography, theme } from "antd";
import { css } from "@emotion/react";

import { useState } from "react";
import { Link } from "react-router-dom";

const { useToken } = theme;
const { Title, Text } = Typography;

type FieldType = {
  email: string;
  password: string;
};

type ShowGlobalErrorsProps = {
  messages: string[];
};
const ShowGlobalErrors = ({ messages }: ShowGlobalErrorsProps) => {
  return (
    <Form.ErrorList
      errors={messages.map(message => (
        <Text type="danger">{message}</Text>
      ))}
    />
  );
};

const Login = () => {
  const [globalErrors, setGlobalErrors] = useState<string[]>([]);
  const { token } = useToken();
  const finishHandler = (values: FieldType) => {
    console.log(values);

    setGlobalErrors(["Email ou senha incorretos. Por favor, tente novamente."]);
  };

  const finishFailedHandler = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <div
      css={css`
        display: flex;
        height: 100vh;
        align-items: center;
        justify-content: center;
        background: ${token.colorBgLayout};
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 1rem;
          padding: 2rem 2.5rem;
          min-width: 200px;
          max-width: 28.125rem;
          width: 100%;
          background: ${token.colorBgContainer};
          border: 1px solid ${token.colorBorder};
          box-shadow: ${token.boxShadow};
          border-radius: ${token.borderRadiusLG}px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
          `}
        >
          <Title level={3}>NOTA CERTA</Title>

          <Text
            css={css`
              text-align: center;
            `}
          >
            Bem-vindo de volta! Pronto para gerenciar seus orçamentos e emitir
            notas fiscais com facilidade?
          </Text>
        </div>

        <Form
          css={css`
            width: 100%;
          `}
          name="basic"
          layout="vertical"
          validateTrigger={["onSubmit"]}
          onFinish={finishHandler}
          onFinishFailed={finishFailedHandler}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message:
                  "Campo de email não pode estar vazio. Por favor, insira seu email.",
              },
              {
                type: "email",
                message:
                  "Endereço de email inválido. Por favor, insira um email válido.",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Senha"
            name="password"
            rules={[
              {
                required: true,
                message:
                  "Campo de senha não pode estar vazio. Por favor, insira sua senha.",
              },
            ]}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: end;
              `}
            >
              <Input.Password size="large" />
              <Link to="/forgot-password">Esqueceu sua senha?</Link>
            </div>
          </Form.Item>
          <ShowGlobalErrors messages={globalErrors} />
          <Form.Item
            css={css`
              padding-top: 1rem;
            `}
          >
            <Button
              css={css`
                width: 100%;
              `}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
        <Text type="secondary">
          Não tem conta? <Link to="/register">Cadastre-se aqui.</Link>
        </Text>
      </div>
    </div>
  );
};

export default Login;
