import { ConfigProvider } from "antd";
import theme from "./theme";

function App() {
  return <ConfigProvider theme={theme}></ConfigProvider>;
}

export default App;
