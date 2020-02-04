/**
 * Interface for initializer object with module config
 *
 * check params description on
 * https://developers.facebook.com/docs/javascript/reference/FB.init
 * (parameters section)
 */
export interface NgxFacebookConfig {
  appId: number;
  version: string;
  cookie?: boolean;
  status?: boolean;
  xfbml?: boolean;
  frictionlessRequests?: boolean;
}
