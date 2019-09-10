interface NgxInstagramBusinessAccount {
  id: number;
}

export interface NgxFacebookPage {
  category: string;
  name: string;
  id: number;
  instagram_business_account: NgxInstagramBusinessAccount;
}
