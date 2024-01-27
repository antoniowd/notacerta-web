import { PropsWithChildren } from "react";
import { css } from "@emotion/react";
import { theme } from "antd";

const { useToken } = theme;

const FlatLayout = ({ children }: PropsWithChildren) => {
  const { token } = useToken();
  return (
    <div
      css={css({
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: token.colorBgLayout,
      })}
    >
      {children}
    </div>
  );
};

export default FlatLayout;
