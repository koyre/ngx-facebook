import { NgxFacebookAuthStatus } from './ngx-facebook-auth-status';
import { NgxFacebookAuthResponse } from './ngx-facebook-auth-response.interface';

export interface NgxFacebookAuthDetails {
  status: NgxFacebookAuthStatus;
  authResponse: NgxFacebookAuthResponse;
}
