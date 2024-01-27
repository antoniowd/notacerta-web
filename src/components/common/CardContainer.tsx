import { PropsWithChildren } from "react";
import { css } from "@emotion/react";
import { theme } from "antd";

const { useToken } = theme;

export type CardContainerProps = {
  maxWidth?: string | number;
};
const CardContainer = ({
  children,
  maxWidth,
}: PropsWithChildren<CardContainerProps>) => {
  const { token } = useToken();
  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 1rem",
        padding: "2rem 2.5rem",
        minWidth: 200,
        maxWidth: maxWidth !== undefined ? maxWidth : "33rem",
        width: "100%",
        background: token.colorBgContainer,
        border: `1px solid ${token.colorBorder}`,
        boxShadow: token.boxShadow,
        borderRadius: `${token.borderRadiusLG}px`,
      })}
    >
      {children}
    </div>
  );
};

export default CardContainer;
