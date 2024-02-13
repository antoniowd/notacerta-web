import PageHeader, { PageHeaderTitle } from "@app/components/common/PageHeader";
import { css } from "@emotion/react";
import CompanySettingsForm from "./CompanySettingsForm";

const CompanySettings = () => {
  return (
    <div>
      <PageHeader>
        <PageHeaderTitle>Empresa | Configurações</PageHeaderTitle>
      </PageHeader>
      <div
        css={css({
          maxWidth: "25rem",
        })}
      >
        <CompanySettingsForm />
      </div>
    </div>
  );
};

export default CompanySettings;
