import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import theme from "./theme";
import AppRouter from "./components/router/AppRouter";
import { Provider as JotaiProvider } from "jotai";

function App() {
  return (
    <JotaiProvider>
      <ConfigProvider locale={ptBR} theme={theme}>
        <AppRouter />
      </ConfigProvider>
    </JotaiProvider>
  );
}

export default App;
