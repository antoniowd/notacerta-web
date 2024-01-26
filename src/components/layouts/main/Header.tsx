import { Button, Layout, Avatar, Dropdown, theme } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

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
    label: <Link to="/clients">Sair</Link>,
  },
];

const Header = ({ siderCollapsed, onFoldClick }: HeaderLayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header
      className={styles.header__container}
      style={{
        background: colorBgContainer,
      }}
    >
      <div className={styles.header__inner_container}>
        <div className={styles.header__left}>
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
        <div className={styles.header__right}>
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
