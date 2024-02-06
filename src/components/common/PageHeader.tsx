import { css } from "@emotion/react";
import { Typography, theme } from "antd";
import { PropsWithChildren } from "react";

const { Title } = Typography;
const { useToken } = theme;

export const PageHeaderTitle = ({ children }: PropsWithChildren) => (
  <Title css={css({ flexGrow: 1 })} type="secondary" level={3}>
    {children}
  </Title>
);

export const PageHeaderRight = ({ children, ...rest }: PropsWithChildren) => (
  <div {...rest}>{children}</div>
);

const PageHeader = ({ children }: PropsWithChildren) => {
  const token = useToken();

  return (
    <div
      css={css({
        borderBottom: `2px solid ${token.token.colorBgLayout}`,
        marginBottom: "1.5rem",
        display: "flex",
      })}
    >
      {children}
    </div>
  );
};

export default PageHeader;
