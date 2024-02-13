import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, Checkbox } from "antd";
import { css } from "@emotion/react";
import AppError from "@app/libs/AppError";
import createUser from "@app/services/user/createUser";
import FlatLayout from "@app/components/layouts/FlatLayout";
import CardContainer from "@app/components/common/CardContainer";
import { useAtom } from "jotai";
import { userModel } from "@app/storage";
import { validateName } from "@app/utils/validators";

const { Title, Text } = Typography;

type FieldType = {
  fullName: string;
  email: string;
  password: string;
  termsAndPrivacy: boolean;
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

const PasswordFieldTooltip = () => {
  return (
    <ul>
      <li>Pelo menos um caractere minúsculo.</li>
      <li>Pelo menos um caractere maiúsculo.</li>
      <li>Pelo menos um número.</li>
      <li>
        Pelo menos um caractere não alfanumérico (como ^ $ * . [ ] &#123; &#125;
        ( ) ? &quot; ! @ # % &amp; / \ , &gt; &lt; ' : ; | _ ~ `).
      </li>
      <li>
        Comprimento mínimo de 6 caracteres, podendo estender-se até 30
        caracteres por padrão (máximo de 4096 caracteres).
      </li>
    </ul>
  );
};

const Signup = () => {
  const [user] = useAtom(userModel);
  const [globalErrors, setGlobalErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const finishHandler = async ({ fullName, email, password }: FieldType) => {
    setLoading(true);
    try {
      await createUser({ displayName: fullName, email, password });
      navigate("/verify-email");
    } catch (err) {
      if (err instanceof AppError) {
        setGlobalErrors([err.message]);
      } else {
        setGlobalErrors([
          "Ocorreu um erro ao criar sua conta. Tente novamente mais tarde ou entre em contato conosco.",
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <FlatLayout>
      <CardContainer>
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
            Bem-vindo a <Text strong>NOTA CERTA</Text>! Cadastre-se e
            simplifique a gestão de seus orçamentos e a emissão de notas
            fiscais.
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
            label={<Text strong>Nome Completo</Text>}
            name="fullName"
            rules={[
              {
                required: true,
                message:
                  "Campo de nome completo não pode estar vazio. Por favor, insira seu nome completo.",
              },
              validateName(),
            ]}
          >
            <Input size="large" />
          </Form.Item>

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
            tooltip={<PasswordFieldTooltip />}
            rules={[
              {
                required: true,
                message:
                  "Campo de senha não pode estar vazio. Por favor, insira sua senha.",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,4096}$/,
                message:
                  "A senha não atende aos requisitos para ser uma senha válida.",
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
            </div>
          </Form.Item>

          <Form.Item<FieldType>
            name="termsAndPrivacy"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message:
                  "É necessário aceitar os Termos de Serviço e a Política de Privacidade para prosseguir.",
              },
            ]}
          >
            <Checkbox>
              Concordo com os <Link to="/terms">Termos de Serviço</Link> e{" "}
              <Link to="/privacy">Política de Privacidade</Link>
            </Checkbox>
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
              loading={loading}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Registrar Conta Grátis
            </Button>
          </Form.Item>
        </Form>
        <Text type="secondary">
          Já tem uma conta? <Link to="/login">Acesse aqui.</Link>
        </Text>
      </CardContainer>
    </FlatLayout>
  );
};

export default Signup;
