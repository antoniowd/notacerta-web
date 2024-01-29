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
      css={css({
        padding: "0 1.25rem",
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        background: colorBgContainer,
      })}
    >
      <div
        css={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        })}
      >
        <div
          css={css({
            display: "flex",
            minWidth: "200px",
            alignItems: "center",
            justifyContent: "start",
            gap: "0.5rem",
          })}
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
          css={css({
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "end",
            gap: "1rem",
          })}
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
              css={css({
                verticalAlign: "middle",
                marginLeft: "16px",
                cursor: "pointer",
              })}
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
