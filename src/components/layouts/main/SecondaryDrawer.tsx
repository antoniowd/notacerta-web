import { Drawer as ADrawer } from "antd";
import SecondaryMenu from "./SecondaryMenu";

export type SecondaryDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const SecondaryDrawer = ({ open, onClose }: SecondaryDrawerProps) => {
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
      <SecondaryMenu onClickItem={onClose} />
    </ADrawer>
  );
};

export default SecondaryDrawer;
