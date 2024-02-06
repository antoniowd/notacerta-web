import React, { CSSProperties, useEffect, useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  CreditCardOutlined,
  TableOutlined,
  FileOutlined,
  CarOutlined,
  FileTextOutlined,
  ShoppingOutlined,
  UserOutlined,
  SettingOutlined,
  ShopOutlined,
  WalletOutlined,
  LogoutOutlined,
  CrownOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { css } from "@emotion/react";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  type?: "group" | "divider" | "item",
  children?: MenuItem[] | null,
  danger?: boolean,
  style?: CSSProperties,
): MenuItem {
  return {
    label,
    key,
    icon,
    type: type === undefined ? "item" : type,
    children,
    danger,
    style,
  } as MenuItem;
}

const items = [
  getItem(<Link to="/profile">Meu perfil</Link>, "/profile", <UserOutlined />),
  getItem(
    <Link to="/subscription">Assinatura</Link>,
    "/subscription",
    <CrownOutlined />,
  ),
  getItem("Configurações", "/settings", <SettingOutlined />, "item", [
    getItem(
      <Link to="/settings/company">Empresa</Link>,
      "/settings/company",
      <ShopOutlined />,
    ),
    getItem(
      <Link to="/settings/taxes">Impostos</Link>,
      "/settings/taxes",
      <WalletOutlined />,
    ),
    getItem(
      <Link to="/settings/clients">Clientes</Link>,
      "/settings/clients",
      <TeamOutlined />,
    ),
    getItem(
      <Link to="/settings/items">Itens</Link>,
      "/settings/items",
      <TableOutlined />,
    ),
    getItem(
      <Link to="/settings/estimates">Orçamentos</Link>,
      "/settings/estimates",
      <FileOutlined />,
    ),
    getItem(
      <Link to="/settings/invoices">Faturas</Link>,
      "/settings/invoices",
      <FileTextOutlined />,
    ),
    getItem(
      <Link to="/settings/payments">Pagamentos</Link>,
      "/settings/payments",
      <CreditCardOutlined />,
    ),
    getItem(
      <Link to="/settings/vendors">Fornecedores</Link>,
      "/settings/vendors",
      <CarOutlined />,
    ),
    getItem(
      <Link to="/settings/expenses">Gastos</Link>,
      "/settings/expenses",
      <ShoppingOutlined />,
    ),
  ]),
  getItem(<Link to="/help">Ajuda</Link>, "/help", <QuestionCircleOutlined />),
  getItem("", "/divider-1", null, "divider"),
  getItem(
    <Link to="/logout">Sair</Link>,
    "/logout",
    <LogoutOutlined />,
    "item",
    null,
    true,
  ),
];

export type SiderMenuProps = {
  onClickItem?: () => void;
};

const SecondaryMenu = ({ onClickItem }: SiderMenuProps) => {
  const [active, setActive] = useState("");
  const location = useLocation();

  // TODO: Change this to startsWith()
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <Menu
      mode="inline"
      onClick={onClickItem}
      selectedKeys={[active]}
      css={css({ height: "100%", borderRight: 0 })}
      items={items}
    />
  );
};

export default SecondaryMenu;
