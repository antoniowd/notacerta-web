import { Button, Layout, Avatar, theme, Typography } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { useState } from "react";
import SecondaryDrawer from "./SecondaryDrawer";
import { useAtom } from "jotai";
import { userModel } from "@app/storage";

const { Text } = Typography;

export type HeaderLayoutProps = {
  siderCollapsed: boolean;
  onFoldClick: () => void;
};

const iconSize = { fontSize: "20px" };

const Header = ({ siderCollapsed, onFoldClick }: HeaderLayoutProps) => {
  const [user] = useAtom(userModel);
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleAvatarClick = () => {
    setShowSecondaryMenu(true);
  };

  const handleCloseMenu = () => {
    setShowSecondaryMenu(false);
  };

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
          <Avatar
            css={css({
              verticalAlign: "middle",
              marginLeft: "16px",
              cursor: "pointer",
            })}
            size="large"
            onClick={handleAvatarClick}
            src={user?.avatarUrl || "/user-blank.webp"}
          />
          <SecondaryDrawer open={showSecondaryMenu} onClose={handleCloseMenu} />
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
