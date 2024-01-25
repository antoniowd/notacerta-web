import { Drawer as ADrawer } from "antd";
import SiderMenu from "./SiderMenu";

export type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

const Drawer = ({ open, onClose }: DrawerProps) => {
  return (
    <ADrawer
      placement="left"
      key="left"
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
      <SiderMenu onClickItem={onClose} />
    </ADrawer>
  );
};

export default Drawer;
