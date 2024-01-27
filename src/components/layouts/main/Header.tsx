import { Button, Layout, Avatar, Dropdown, Typography, theme } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

const { Text } = Typography;

export type HeaderLayoutProps = {
  siderCollapsed: boolean;
  onFoldClick: () => void;
};

const iconSize = { fontSize: "20px" };
const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: "2",
    label: <Link to="/clients">Clientes</Link>,
  },
  {
    key: "3",
    label: (
      <Link to="/login">
        <Text type="danger">Sair</Text>
      </Link>
    ),
  },
];

const Header = ({ siderCollapsed, onFoldClick }: HeaderLayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header
      css={css`
        padding: 0 1.25rem;
        position: sticky;
        top: 0;
        z-index: 1;
        width: 100%;
        background: ${colorBgContainer};
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: start;
        `}
      >
        <div
          css={css`
            display: flex;
            min-width: 200px;
            align-items: center;
            justify-content: start;
            gap: 0.5rem;
          `}
        >
          <Button
            type="text"
            shape="circle"
            icon={
              siderCollapsed ? (
                <MenuUnfoldOutlined style={iconSize} />
              ) : (
                <MenuFoldOutlined style={iconSize} />
              )
            }
            onClick={onFoldClick}
          />
          NOTA CERTA
        </div>
        <div
          css={css`
            display: flex;
            flex-grow: 1;
            align-items: center;
            justify-content: end;
            gap: 1rem;
          `}
        >
          <Button shape="circle" type="text">
            <SettingOutlined style={iconSize} />
          </Button>
          <Button shape="circle" type="text">
            <BellOutlined style={iconSize} />
          </Button>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Avatar
              style={{
                verticalAlign: "middle",
                marginLeft: "16px",
                cursor: "pointer",
              }}
              size="large"
            >
              A
            </Avatar>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
