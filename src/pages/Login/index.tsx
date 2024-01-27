import { Form, Input, Button, Typography } from "antd";
import { css } from "@emotion/react";

import { useState } from "react";
import { Link } from "react-router-dom";
import FlatLayout from "@app/components/layouts/FlatLayout";
import CardContainer from "@app/components/common/CardContainer";

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
  const finishHandler = (values: FieldType) => {
    console.log(values);

    setGlobalErrors(["Email ou senha incorretos. Por favor, tente novamente."]);
  };

  const finishFailedHandler = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <FlatLayout>
      <CardContainer maxWidth="28rem">
        <div
          css={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
          })}
        >
          <Title level={3}>NOTA CERTA</Title>

          <Text
            css={css({
              textAlign: "center",
            })}
          >
            Bem-vindo de volta! Pronto para gerenciar seus orçamentos e emitir
            notas fiscais com facilidade?
          </Text>
        </div>

        <Form
          css={css({
            width: "100%",
          })}
          name="basic"
          layout="vertical"
          validateTrigger={["onSubmit"]}
          onFinish={finishHandler}
          onFinishFailed={finishFailedHandler}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={<Text strong>Email</Text>}
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
            label={<Text strong>Senha</Text>}
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
              css={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              })}
            >
              <Input.Password size="large" />
              <Link to="/forgot-password">Esqueceu sua senha?</Link>
            </div>
          </Form.Item>
          <ShowGlobalErrors messages={globalErrors} />
          <Form.Item
            css={css({
              paddingTop: "1rem",
            })}
          >
            <Button
              css={css({
                width: "100%",
              })}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
        <Text type="secondary">
          Não tem conta? <Link to="/signup">Cadastre-se aqui.</Link>
        </Text>
      </CardContainer>
    </FlatLayout>
  );
};

export default Login;
