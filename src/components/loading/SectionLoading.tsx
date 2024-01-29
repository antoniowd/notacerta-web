import { css } from "@emotion/react";
import { theme } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { useToken } = theme;

const SectionLoading = () => {
  const token = useToken();
  return (
    <div
      css={css({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      })}
    >
      <LoadingOutlined
        css={css({
          fontSize: "2.5rem",
          color: token.token.colorPrimary,
        })}
      />
    </div>
  );
};

export default SectionLoading;
