import { Drawer as ADrawer, Avatar, Divider, Typography } from "antd";
import SecondaryMenu from "./SecondaryMenu";
import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { userModel } from "@app/storage";

const { Text } = Typography;

export type SecondaryDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const SecondaryDrawer = ({ open, onClose }: SecondaryDrawerProps) => {
  const [user] = useAtom(userModel);
  return (
    <ADrawer
      placement="right"
      key="right"
      title="NOTA CERTA"
      width={250}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingLeft: "8px",
          paddingRight: "8px",
        },
      }}
    >
      {/* TODO: Fix the overflow in the drawer */}
      <div
        css={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        })}
      >
        <Avatar
          css={css({
            verticalAlign: "middle",
          })}
          size="large"
          src={user?.avatarUrl || "/user-blank.webp"}
        />

        <div
          css={css({
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          })}
        >
          <Text strong css={css({ fontSize: "0.8rem" })}>
            {user?.fullName}
          </Text>
          <Text type="secondary" css={css({ fontSize: "0.6rem" })}>
            {user?.email}
          </Text>
        </div>
      </div>
      <Divider />
      <SecondaryMenu onClickItem={onClose} />
    </ADrawer>
  );
};

export default SecondaryDrawer;
