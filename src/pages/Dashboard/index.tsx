import PageHeader, { PageHeaderTitle } from "@app/components/common/PageHeader";
import { Alert, Typography } from "antd";
import { companiesData } from "@app/storage";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";

const { Text } = Typography;

const Dashboard = () => {
  const [companies] = useAtom(companiesData);

  return (
    <div>
      <PageHeader>
        <PageHeaderTitle>Dashboard</PageHeaderTitle>
      </PageHeader>

      {companies && companies.length === 0 && (
        <Alert
          message="Empresa não configurada"
          description={
            <Text>
              Para poder gerar orçamentos e notas fiscais, é necessário
              configurar sua empresa. Clique{" "}
              <Link to="/settings/company">aqui</Link> para configurar.
            </Text>
          }
          type="warning"
          showIcon
        />
      )}
    </div>
  );
};

export default Dashboard;
