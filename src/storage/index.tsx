import { UserModel } from "@app/domain/UserModel";
import { atom } from "jotai";

export const userModel = atom<UserModel | null>(null);

export type ProfileData = {
  defaultCompany: string | null;
};
export const profileData = atom<ProfileData | undefined>(undefined);

export type CompanyData = {
  id: string;
  ownerId: string;
  businessName: string;
  businessId: string;
  state: string;
  logoUrl: string;
  createAt: Date;
};
export const companiesData = atom<CompanyData[] | []>([]);

export const defaultCompany = atom(get =>
  get(companiesData).find(
    (company: CompanyData) => company.id === get(profileData)?.defaultCompany,
  ),
);
