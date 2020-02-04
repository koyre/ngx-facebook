import { Injectable } from '@angular/core';
import { NextObserver, Observable } from 'rxjs';

import { NgxFacebookAuthDetails, NgxFacebookAuthResponse, NgxFacebookAuthStatus, NgxFacebookConfig } from './models';
import { tap } from 'rxjs/operators';

declare var FB: any;

function appendFacebookScript() {
  const tag = 'script';
  const id = 'facebook-js-sdk';

  const firstScriptEl = document.getElementsByTagName(tag)[0];

  if (document.getElementById(id)) {
    throw Error(`Script with id: '${id}' already exists`);
  }

  const scriptEl: HTMLScriptElement =
    document.createElement(tag) as HTMLScriptElement;

  scriptEl.id = id;
  scriptEl.src = 'https://connect.facebook.net/en_US/sdk.js';
  firstScriptEl.parentNode.insertBefore(scriptEl, firstScriptEl);
}



@Injectable()
export class NgxFacebookService {
  /**
   * has user authorize app
   */
  public get connected(): boolean {
    return this._status === NgxFacebookAuthStatus.connected;
  }

  /**
   * get user's facebook access token
   */
  public get accessToken(): string {
    return this.connected && this._authorization.accessToken;
  }

  /**
   * get app config
   */
  public get config(): NgxFacebookConfig {
    return this._config;
  }

  private _config: NgxFacebookConfig;
  private _authorization: NgxFacebookAuthResponse;
  private _status = NgxFacebookAuthStatus.unknown;

  public init(config: NgxFacebookConfig): void {
    this._config = config;

    (window as any).fbAsyncInit = () => {
      FB.init(this.config);
      FB.AppEvents.logPageView();
    };

    appendFacebookScript();
  }

  public checkAuthorization(): Observable<NgxFacebookAuthDetails> {
    return new Observable((observer: NextObserver<NgxFacebookAuthDetails>) => {
      FB.getLoginStatus((details: NgxFacebookAuthDetails) => {
        observer.next(details);
        observer.complete();
      });
    }).pipe(tap(this._saveResponse));
  }

  public login(permissions: string[] = []): Observable<NgxFacebookAuthDetails> {
    const scope = permissions.toString();

    return new Observable((observer: NextObserver<NgxFacebookAuthDetails>) => {
      FB.login(
        (details: NgxFacebookAuthDetails) => {
          if (details.status === NgxFacebookAuthStatus.connected) {
            observer.next(details);
            observer.complete();
            return;
          }
          observer.error(details);
        },
        { scope },
      );
    }).pipe(tap(this._saveResponse));
  }

  private _saveResponse({status, authResponse}: NgxFacebookAuthDetails) {
    this._status = status;
    this._authorization = authResponse;
  }
}
