interface IFacebookAuthResponseData {
  accessToken: string;
  expiresIn: string;
  signedRequest: string;
  userID: string;
}

export interface IFacebookAuthResponse {
  status: string;
  authResponse: IFacebookAuthResponseData;
}
