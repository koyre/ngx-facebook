import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

declare var FB: any;

import { NextObserver, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  IFacebookAuthResponse,
  IFacebookDataArray,
  IFacebookPage,
  IFacebookUser,
  IInstagramAccount,
  IFacebookAppInitializer
} from './models';



@Injectable({
  providedIn: 'root'
})
export class NgxFacebookService {
  private readonly API = 'https://graph.facebook.com';

  constructor(private readonly _http: HttpClient) {}

  public init(initializer: IFacebookAppInitializer): void {
    const defaults = {
      cookie: true,
      xfbml: true,
      version: 'v3.3',
    };

    (window as any).fbAsyncInit = () => {
      FB.init({...defaults, ...initializer});
      FB.AppEvents.logPageView();
    };

    this._init(document, 'script', 'facebook-jssdk');
  }

  public login(permissions: string[] = []): Observable<IFacebookAuthResponse> {
    const scope = permissions.toString();

    return new Observable((observer: NextObserver<IFacebookAuthResponse>) => {
      FB.login(
        (response: IFacebookAuthResponse) => {
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

  public getAccountInfo(accessToken: string): Observable<IFacebookUser> {
    const params = new HttpParams().set('access_token', accessToken);
    const url = `${this.API}/me`;

    return this._http.get<IFacebookUser>(url, { params });
  }

  // empty array means that user has no linked instagram accounts
  public getPages(
    userID: number,
    accessToken: string,
  ): Observable<IFacebookPage[]> {
    const requiredFields = 'instagram_business_account,name,category';
    const params = new HttpParams()
      .set('access_token', accessToken)
      .set('fields', requiredFields);

    const url = `${this.API}/${userID}/accounts`;

    return this._http
      .get<IFacebookDataArray<IFacebookPage>>(url, { params })
      .pipe(
        map(response => response.data),
        map(pages => pages.filter(page => page.instagram_business_account)),
      );
  }

  public getInstagramAccountInfo(
    instagramID: number,
    accessToken: string,
  ): Observable<IInstagramAccount> {
    const params = new HttpParams()
      .set('access_token', accessToken)
      .set('fields', 'username');
    const url = `${this.API}/${instagramID}`;

    return this._http.get<IInstagramAccount>(url, { params });
  }

  public getMedia(pageID: number, accessToken: string): Observable<any> {
    const params = new HttpParams()
      .set('access_token', accessToken)
      .set('fields', 'media_url')
      .set('limit', '6')
      .set('type', 'PHOTO');

    const url = `${this.API}/${pageID}/media`;

    return this._http.get<IFacebookDataArray<IFacebookPage>>(url, { params });
  }

  private _init(d, s, id) {
    let js;
    const fjs = d.getElementsByTagName(s)[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }
}
