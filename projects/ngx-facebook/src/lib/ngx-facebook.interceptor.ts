import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxFacebookService } from './ngx-facebook.service';

@Injectable()
export class NgxFacebookInterceptor implements HttpInterceptor {
  private readonly _keyword = 'ngx-facebook';
  private readonly _apiUrl = 'https://graph.facebook.com';

  constructor(private readonly _ngxFacebookService: NgxFacebookService) {}

  public intercept(
    originalReq: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const connected = this._ngxFacebookService.connected;

    if (!connected) {
      return next.handle(originalReq);
    }

    return next.handle(this._updateRequest(originalReq));
  }

  private _updateRequest(originalReq: HttpRequest<any>) {
    const originalUrl = originalReq.url;
    const indexOfKeyword = originalUrl.indexOf(this._keyword);
    const hasKeyword = indexOfKeyword >= 0;

    if (!hasKeyword) {
      return originalReq;
    }

    // + 1 is for '/' symbol
    const indexOfRelatedUrl = indexOfKeyword + this._keyword.length + 1;
    const relatedUrl = originalUrl.slice(indexOfRelatedUrl);
    const { version } = this._ngxFacebookService.config;
    const newUrl = `${this._apiUrl}/${version}/${relatedUrl}`;

    return originalReq.clone({
      url: newUrl,
      setParams: {
        access_token: this._ngxFacebookService.accessToken
      }
    });
  }
}
