import { theme, Layout } from "antd";
import SiderMenu from "./SiderMenu";
import { css } from "@emotion/react";

export type SiderProps = {
  collapsed: boolean;
  onBreakpoint: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sider = ({ collapsed, onBreakpoint }: SiderProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout.Sider
      width={200}
      collapsedWidth={60}
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      onBreakpoint={onBreakpoint}
    >
      <div
        css={css({
          background: colorBgContainer,
          paddingTop: "1.5rem",
          overflow: "auto",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        })}
      >
        <SiderMenu />
      </div>
    </Layout.Sider>
  );
};

export default Sider;
