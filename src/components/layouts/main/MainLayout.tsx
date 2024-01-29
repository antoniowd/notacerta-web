import { useEffect, useState } from "react";
import { Layout, Grid } from "antd";
import { Outlet } from "react-router-dom";
import Content from "./Content";
import Header from "./Header";
import Drawer from "./Drawer";
import Sider from "./Sider";
import { css } from "@emotion/react";

const { useBreakpoint } = Grid;

const MainLayout = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const screens = useBreakpoint();
  const [showSider, setShowSider] = useState(true);

  useEffect(() => {
    setShowSider(screens.sm !== undefined ? screens.sm : true);
    if (screens.lg === true && showDrawer) {
      setShowDrawer(false);
    }
  }, [screens, showDrawer]);

  const handleMenuFolding = () => {
    if (screens.lg === false) {
      setShowDrawer(true);
    } else {
      setSiderCollapsed(v => !v);
    }
  };

  const handlerCloseDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <Layout>
      <Header siderCollapsed={siderCollapsed} onFoldClick={handleMenuFolding} />
      <Layout
        css={css({
          height: "calc(100vh - 64px)",
        })}
      >
        <Drawer open={showDrawer} onClose={handlerCloseDrawer} />
        {showSider && (
          <Sider collapsed={siderCollapsed} onBreakpoint={setSiderCollapsed} />
        )}
        <Layout
          css={css({
            position: "relative",
          })}
        >
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
