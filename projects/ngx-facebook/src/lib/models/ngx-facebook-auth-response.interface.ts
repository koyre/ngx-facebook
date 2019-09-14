interface NgxFacebookAuthResponseData {
  accessToken: string;
  expiresIn: string;
  signedRequest: string;
  userID: string;
}

export interface NgxFacebookAuthResponse {
  status: string;
  authResponse: NgxFacebookAuthResponseData;
}
