import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, Button } from "antd";
import type { GetProp, UploadProps, UploadFile } from "antd";
import { css } from "@emotion/react";
import { useState } from "react";
import { UploadListType } from "antd/lib/upload/interface";

export type UploaderProps = {
  initialUrl: string | undefined | null;
  onChange: (url: UploadFile | null) => void;
  onError: (error: string) => void;
  listType?: UploadListType;
};

type FileUploadType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileUploadType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const Uploader = ({
  initialUrl,
  onChange,
  onError,
  listType = "picture-circle",
}: UploaderProps) => {
  const [imageUrl, setImageUrl] = useState(initialUrl);

  const beforeUpload = (file: FileUploadType) => {
    onError("");
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      onError("Você só pode fazer upload de arquivos JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      onError("A imagem deve ser menor que 2MB!");
    }

    return false;
  };

  const handleChange: UploadProps["onChange"] = info => {
    getBase64(info.file as FileUploadType, url => {
      setImageUrl(url);
      onChange(info.file);
    });
  };

  const handleRemove = () => {
    onError("");
    setImageUrl("");
    onChange(null);
  };

  const uploadButton = (
    <button css={css({ border: 0, background: "none" })} type="button">
      <PlusOutlined />
      <div css={css({ marginTop: "0.5rem" })}>Subir</div>
    </button>
  );

  return (
    <div
      css={css({
        position: "relative",
        width: "100%",
        height: "100%",
      })}
    >
      {imageUrl && (
        <div
          css={css({
            position: "absolute",
            left: 0,
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <Button shape="circle" danger onClick={handleRemove}>
            <DeleteOutlined />
          </Button>
        </div>
      )}
      <Upload
        name="Logo"
        listType={listType}
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        maxCount={1}
        multiple={false}
      >
        {imageUrl ? (
          <img
            css={css({
              width: "100%",
              borderRadius: listType === "picture-circle" ? "100%" : "auto",
              margin: "1px",
            })}
            src={imageUrl}
            alt="avatar"
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

export default Uploader;
