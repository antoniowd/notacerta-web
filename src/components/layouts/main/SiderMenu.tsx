import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  LineChartOutlined,
  CreditCardOutlined,
  TableOutlined,
  FileOutlined,
  CarOutlined,
  FileTextOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { css } from "@emotion/react";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  type?: "group" | "divider",
): MenuItem {
  return {
    label,
    key,
    icon,
    type: type === undefined ? "item" : type,
  } as MenuItem;
}

const links = [
  { icon: <HomeOutlined />, label: "Dashboard", href: "/" },
  {
    icon: <TeamOutlined />,
    label: "Clientes",
    href: "/clients",
  },
  { icon: <TableOutlined />, label: "Itens", href: "/items" },
  { label: "-" },
  {
    icon: <FileOutlined />,
    label: "Orcamentos",
    href: "/estimates",
  },
  {
    icon: <FileTextOutlined />,
    label: "Faturas",
    href: "/invoices",
  },
  {
    icon: <CreditCardOutlined />,
    label: "Pagamentos",
    href: "/payments",
  },
  {
    icon: <CarOutlined />,
    label: "Fornecedores",
    href: "/vendors",
  },
  {
    icon: <ShoppingOutlined />,
    label: "Gastos",
    href: "/expenses",
  },
  {
    icon: <LineChartOutlined />,
    label: "Reportes",
    href: "/reports",
  },
];

const items = links.map(({ icon, label, href }) =>
  label === "-"
    ? getItem("", "divider", null, "group")
    : getItem(
        <Link to={href || ""}>{label}</Link>,
        href?.toLowerCase() || "/",
        icon,
      ),
);

export type SiderMenuProps = {
  onClickItem?: () => void;
};

const SiderMenu = ({ onClickItem }: SiderMenuProps) => {
  const [active, setActive] = useState("");
  const location = useLocation();

  // TODO: Change this to startWiths()
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

export default SiderMenu;
