import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import theme from "./theme";
import AppRouter from "./components/router/AppRouter";

function App() {
  return (
    <ConfigProvider locale={ptBR} theme={theme}>
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;
