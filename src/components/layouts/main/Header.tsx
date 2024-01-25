import { Button, Layout, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

export type HeaderLayoutProps = {
  siderCollapsed: boolean;
  onFoldClick: () => void;
};

const Header = ({ siderCollapsed, onFoldClick }: HeaderLayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header
      style={{
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: colorBgContainer,
      }}
    >
      <Button
        type="text"
        icon={
          siderCollapsed ? (
            <MenuUnfoldOutlined style={{ fontSize: "20px" }} />
          ) : (
            <MenuFoldOutlined style={{ fontSize: "20px" }} />
          )
        }
        onClick={onFoldClick}
      />
      NOTA CERTA
    </Layout.Header>
  );
};

export default Header;
