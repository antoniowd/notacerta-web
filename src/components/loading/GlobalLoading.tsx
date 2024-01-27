import { css } from "@emotion/react";
import { LoadingOutlined } from "@ant-design/icons";

const GlobalLoading = () => {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      `}
    >
      <LoadingOutlined
        css={css`
          font-size: 2.5rem;
          color: #ff8c00;
        `}
      />
    </div>
  );
};

export default GlobalLoading;
