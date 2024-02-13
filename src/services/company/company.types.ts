export type Company = {
  id: string;
  businessName: string;
  businessId: string;
  logoUrl: string | undefined;
  state: string;
};

export type CreateCompanyDTO = Omit<Company, "id">;

export type UpdateCompanyDTO = Company;
