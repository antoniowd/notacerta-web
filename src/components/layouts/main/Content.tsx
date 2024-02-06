import { Layout, theme } from "antd";
import { WithChildrenProps } from "../../../@types/generalTypes";
import { css } from "@emotion/react";

const Content = ({ children }: WithChildrenProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG, boxShadowTertiary },
  } = theme.useToken();
  return (
    <Layout.Content
      css={css({
        position: "absolute",
        padding: "1rem",
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
        overflow: "auto",
      })}
    >
      <div
        css={css({
          padding: "1rem",
          background: colorBgContainer,
          borderRadius: `${borderRadiusLG}px`,
          boxShadow: boxShadowTertiary,
        })}
      >
        {children}
      </div>
    </Layout.Content>
  );
};

export default Content;
