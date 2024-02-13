import { Button, Form, Input, Typography } from "antd";
import type { UploadFile } from "antd";
import { validateName } from "@app/utils/validators";
import { useAtom } from "jotai";
import { useState } from "react";
import { userModel } from "@app/storage";
import Uploader from "@app/components/form/Uploader";
import { css } from "@emotion/react";
import { auth } from "@app/config/firebase";
import { updateProfile } from "firebase/auth";
import { UserModel } from "@app/domain/UserModel";
import uploadObject from "@app/services/firebaseStorage/uploadObject";
import deleteObject from "@app/services/firebaseStorage/deleteObject";

const { Text } = Typography;

export type FieldType = {
  fullName: string;
  email: string;
};

const UserForm = () => {
  const [user, setUser] = useAtom(userModel);
  const [avatar, setAvatar] = useState<UploadFile | null>(null);
  const [isUploaderChanged, setIsUploaderChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [needToSave, setNeedToSave] = useState(false);

  const handleUploadChange = (file: UploadFile | null) => {
    setAvatar(file);
    setIsUploaderChanged(true);
    setNeedToSave(true);
  };

  const handleUploadError = (error: string) => {
    setError(error);
  };

  const handleSubmit = async (data: FieldType) => {
    if (error != "") {
      return;
    }
    setError("");
    setLoading(true);
    let url = "";
    try {
      const extension =
        avatar && avatar.type ? avatar.type?.split("/") : ["png"];
      const storageUrl = `profile_images/${user?.id}/avatar.${
        extension[extension?.length - 1]
      }`;

      if (avatar) {
        const uploadResult = await uploadObject(storageUrl, avatar as any);
        url = uploadResult.url;
      } else {
        if (user && user.avatarUrl && isUploaderChanged) {
          await deleteObject(user.avatarUrl);
        }
      }

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: data.fullName,
          photoURL: isUploaderChanged ? url : auth.currentUser.photoURL,
        });
        setUser(UserModel.createFromFirebase(auth.currentUser));
      }
    } catch (error) {
      // TODO: Capture AppErrors
      setError("Ocorreu um erro ao atualizar o seu perfil.");
    } finally {
      setLoading(false);
      setNeedToSave(false);
    }
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      validateTrigger={["onSubmit"]}
      onFinish={handleSubmit}
      autoComplete="off"
      initialValues={{
        fullName: user?.fullName,
        email: user?.email,
      }}
    >
      <div
        css={css({
          marginBottom: "1rem",
        })}
      >
        <Uploader
          initialUrl={user?.avatarUrl}
          onChange={handleUploadChange}
          onError={handleUploadError}
        />
      </div>
      <Form.Item<FieldType>
        label="Nome Completo"
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
        <Input onChange={() => setNeedToSave(true)} />
      </Form.Item>
      <Form.Item<FieldType>
        label="Email"
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
        <Input disabled />
      </Form.Item>

      {error !== "" && (
        <Form.ErrorList
          css={css({
            marginBottom: "0.5rem",
          })}
          errors={[error].map(message => (
            <Text type="danger">{message}</Text>
          ))}
        />
      )}
      <Form.Item>
        <Button
          css={css({ width: "auto" })}
          loading={loading}
          type="primary"
          htmlType="submit"
        >
          Salvar
        </Button>
        <br />
        {needToSave && (
          <Text type="secondary" css={css({ fontSize: "0.6rem" })}>
            * Alterações não salvas
          </Text>
        )}
      </Form.Item>
    </Form>
  );
};

export default UserForm;
