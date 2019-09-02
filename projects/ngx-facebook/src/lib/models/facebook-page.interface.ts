interface IInstagramBusinessAccount {
  id: number;
}

export interface IFacebookPage {
  category: string;
  name: string;
  id: number;
  instagram_business_account: IInstagramBusinessAccount;
}
