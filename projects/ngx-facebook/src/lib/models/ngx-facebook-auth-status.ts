/**
 * possible statuses of facebook authorization
 *
 * connected - user is logged into Facebook, and has authorized your application
 * not_authorized - user is logged into Facebook, but hasn't authorized your application
 * unknown - user is not logged into Facebook
 */
export enum NgxFacebookAuthStatus {
  connected = 'connected',
  notAuthorized = 'not_authorized',
  unknown = 'unknown'
}
