import { useState } from "react";
import { Button, Form, Input, Select, Typography } from "antd";
import type { UploadFile } from "antd";
import uploadObject from "@app/services/firebaseStorage/uploadObject";
import deleteObject from "@app/services/firebaseStorage/deleteObject";
import { css } from "@emotion/react";
import Uploader from "@app/components/form/Uploader";
import states from "@app/data/states.json";
import { useAtom } from "jotai";
import { defaultCompany } from "@app/storage";
import createCompany from "@app/services/company/createCompany";
import updateCompany from "@app/services/company/updateCompany";

const { Text } = Typography;

export type FieldType = {
  businessName: string;
  businessId: string;
  state: string;
};

const CompanySettingsForm = () => {
  const [company] = useAtom(defaultCompany);
  const [avatar, setAvatar] = useState<UploadFile | null>(null);
  const [isUploaderChanged, setIsUploaderChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [needToSave, setNeedToSave] = useState(false);

  console.log(company);

  const handleUploadChange = (file: UploadFile | null) => {
    setAvatar(file);
    setIsUploaderChanged(true);
    setNeedToSave(true);
  };

  const handleUploadError = (error: string) => {
    setError(error);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleSubmit = async ({
    businessName,
    businessId,
    state,
  }: FieldType) => {
    if (error != "") {
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Handle the logo upload
      let logoUrl = company?.logoUrl;
      if (avatar) {
        const extension =
          avatar && avatar.type ? avatar.type?.split("/") : ["png"];
        const storageUrl = `company_images/logo/${avatar?.uid}.${
          extension[extension?.length - 1]
        }`;
        const response = await uploadObject(storageUrl, avatar as any);
        logoUrl = response.url;
      } else {
        if (logoUrl && isUploaderChanged) {
          await deleteObject(logoUrl);
          logoUrl = undefined;
        }
      }

      if (company?.id) {
        // Update company
        // TODO: if we update the logo, remove the previous one.
        await updateCompany({
          id: company.id,
          businessName,
          businessId,
          state,
          logoUrl,
        });
      } else {
        // Create a new one
        await createCompany({
          businessName,
          businessId,
          state,
          logoUrl,
        });
      }
    } catch (error) {
      console.error(error);
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
        businessName: company?.businessName,
        businessId: company?.businessId,
        state: company?.state,
      }}
    >
      <div
        css={css({
          marginBottom: "1rem",
        })}
      >
        <div css={css({ marginBottom: "0.5rem" })}>
          <Text>Logo da empresa</Text>
        </div>
        <Uploader
          initialUrl={company?.logoUrl}
          onChange={handleUploadChange}
          onError={handleUploadError}
          listType="picture-card"
        />
      </div>
      <Form.Item<FieldType>
        label="Nome da empresa"
        name="businessName"
        rules={[
          {
            required: true,
            message: "Campo de Nome da empresa não pode estar vazio.",
          },
        ]}
      >
        <Input onChange={() => setNeedToSave(true)} />
      </Form.Item>
      <Form.Item<FieldType>
        label="CNPJ"
        name="businessId"
        rules={[
          {
            required: true,
            message: "Campo CNPJ não pode estar vazio.",
          },
        ]}
      >
        <Input onChange={() => setNeedToSave(true)} />
      </Form.Item>
      <Form.Item<FieldType>
        label="Estado"
        name="state"
        rules={[
          {
            required: true,
            message: "Campo Estado não pode estar vazio.",
          },
        ]}
      >
        <Select
          onChange={() => setNeedToSave(true)}
          allowClear
          showSearch
          filterOption={filterOption}
          options={Object.entries(states).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
        />
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

export default CompanySettingsForm;
