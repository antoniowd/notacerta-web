import PageHeader, { PageHeaderTitle } from "@app/components/common/PageHeader";
import { css } from "@emotion/react";
import UserForm from "./UserForm";

const Profile = () => {
  return (
    <div>
      <PageHeader>
        <PageHeaderTitle>Perfil</PageHeaderTitle>
      </PageHeader>
      <div
        css={css({
          maxWidth: "25rem",
        })}
      >
        <UserForm />
      </div>

      <PageHeader>
        <PageHeaderTitle>Segurança</PageHeaderTitle>
      </PageHeader>
    </div>
  );
};

export default Profile;
