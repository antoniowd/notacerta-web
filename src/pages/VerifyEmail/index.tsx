import { Button, Typography } from "antd";
import CardContainer from "@app/components/common/CardContainer";
import FlatLayout from "@app/components/layouts/FlatLayout";
import { css } from "@emotion/react";
import { LOGIN_REDIRECT, auth } from "@app/config/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const VerifyEmail = () => {
  const [disabled, setDisabled] = useState(true);
  const [counter, setCounter] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser !== null && auth.currentUser.emailVerified) {
      navigate("/");
    }

    if (auth.currentUser === null) {
      navigate("/login");
    }
  }, [auth]);

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

  const resendHandler = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser, {
        url: LOGIN_REDIRECT,
      });
      setDisabled(true);
    }
  };

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

          <Title level={5}>Apenas mais um passo</Title>
          <Text>
            Enviamos um e-mail para{" "}
            <Text strong>{auth.currentUser?.email}</Text> a fim de validar a sua
            conta. Por favor, verifique sua caixa de entrada e siga as
            instruções para concluir o processo de validação.
          </Text>

          <Button
            disabled={disabled}
            css={css({ marginTop: "1.5rem" })}
            onClick={resendHandler}
          >
            Não recebeu? Reenviar E-mail
          </Button>
          {disabled && (
            <Text type="secondary" css={css({ marginTop: "0.5rem" })}>
              Aguarde {counter} segundos para reenviar o e-mail.
            </Text>
          )}
        </div>
      </CardContainer>
    </FlatLayout>
  );
};

export default VerifyEmail;
