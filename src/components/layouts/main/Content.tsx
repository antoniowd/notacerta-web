import { Layout, theme } from "antd";
import { WithChildrenProps } from "../../../@types/generalTypes";

const Content = ({ children }: WithChildrenProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout.Content
      style={{
        position: "absolute",
        padding: 16,
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
        overflow: "auto",
      }}
    >
      <div
        style={{
          padding: 16,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </div>
    </Layout.Content>
  );
};

export default Content;
