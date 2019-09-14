import { Injectable } from '@angular/core';

declare var FB: any;

import { NextObserver, Observable } from 'rxjs';

import {
  NgxFacebookAuthResponse,
  NgxFacebookConfig
} from './models';

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
  public init(config: NgxFacebookConfig): void {
    const defaults = {
      cookie: true,
      xfbml: true,
      version: 'v3.3',
    };

    (window as any).fbAsyncInit = () => {
      FB.init({...defaults, ...config});
      FB.AppEvents.logPageView();
    };

    appendFacebookScript();
  }

  public login(permissions: string[] = []): Observable<NgxFacebookAuthResponse> {
    const scope = permissions.toString();

    return new Observable((observer: NextObserver<NgxFacebookAuthResponse>) => {
      FB.login(
        (response: NgxFacebookAuthResponse) => {
          observer.next(response);
          observer.complete();
        },
        {
          auth_type: 'rerequest',
          scope,
        },
      );
    });
  }
}
