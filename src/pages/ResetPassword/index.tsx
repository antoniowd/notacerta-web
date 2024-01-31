import CardContainer from "@app/components/common/CardContainer";
import FlatLayout from "@app/components/layouts/FlatLayout";
import { Button, Form, Input, Typography, message } from "antd";
import { userModel } from "@app/storage";
import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { LOGIN_REDIRECT, auth } from "@app/config/firebase";

const { Title, Text } = Typography;

type FieldType = {
  email: string;
};

const ResetPassword = () => {
  const [user] = useAtom(userModel);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [counter, setCounter] = useState(60);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (disabled) {
      interval = setInterval(() => {
        setCounter(current => current - 1);
      }, 1000);
    } else {
      setCounter(60);
    }

    return () => {
      clearInterval(interval);
    };
  }, [disabled]);

  useEffect(() => {
    if (counter === 0) {
      setDisabled(false);
    }
  }, [counter]);

  const finishHandler = async ({ email }: FieldType) => {
    setLoading(true);
    await sendPasswordResetEmail(auth, email, { url: LOGIN_REDIRECT });
    setLoading(false);
    setDisabled(true);
    messageApi.open({
      style: { maxWidth: "400px", marginLeft: "auto", marginRight: "auto" },
      type: "success",
      content:
        "Um e-mail foi enviado para o endereço fornecido com instruções sobre como redefinir sua senha. Por favor, verifique sua caixa de entrada (e a pasta de spam, caso necessário) para prosseguir com a redefinição.",
      duration: 10,
    });
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <FlatLayout>
      <CardContainer>
        {contextHolder}
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
            Por favor, insira seu e-mail para enviarmos um link de redefinição
            de senha.
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

          <Form.Item
            css={css({
              paddingTop: "1rem",
            })}
          >
            <Button
              css={css({
                width: "100%",
              })}
              loading={loading}
              disabled={disabled}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Enviar link
            </Button>
            {disabled && (
              <Text type="secondary" css={css({ marginTop: "0.5rem" })}>
                Aguarde {counter} segundos para reenviar o e-mail.
              </Text>
            )}
          </Form.Item>
        </Form>

        <Text type="secondary" css={css({ marginTop: "1rem" })}>
          <Link to="/login">Voltar ao login.</Link>
        </Text>
      </CardContainer>
    </FlatLayout>
  );
};

export default ResetPassword;
