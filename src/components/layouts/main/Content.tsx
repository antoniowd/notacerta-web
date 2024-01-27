import { Layout, theme } from "antd";
import { WithChildrenProps } from "../../../@types/generalTypes";
import { css } from "@emotion/react";

const Content = ({ children }: WithChildrenProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout.Content
      css={css`
        position: absolute;
        padding: 1rem;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        overflow: auto;
      `}
    >
      <div
        css={css`
          padding: 1rem;
          background: ${colorBgContainer};
          border-radius: ${borderRadiusLG}px;
        `}
      >
        {children}
      </div>
    </Layout.Content>
  );
};

export default Content;
