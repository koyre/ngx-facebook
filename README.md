# NgxFacebook

Angular library that simplifies connection to facebook <3 

## Installation

#### 1. Add library to your package

Install @koyre/ngx-facebook via NPM
 
`npm i --save @koyre/ngx-facebook`

or Yarn

`yarn add @koyre/ngx-facebook`

#### 2. Import NgxFacebookModule into your target module

For example into your app's root module

(do so with `.forRoot()` to provide NgxFacebookService)
```typescript
import { NgxFacebookModule } from '@koyre/ngx-facebook';
 
@NgModule({
  ...
  imports: [
    NgxFacebookModule.forRoot()
  ],
  ...
})
export class AppModule { }
```

#### 3. Initialize connection

Call NgxFacebookService method `init` with config object (with your facebook app id, facebook api version):

```typescript
...

import {
  NgxFacebookService,
  NgxFacebookConfig,
} from '@koyre/ngx-facebook';

...

export class AppComponent implements OnInit {
  constructor(
    private readonly _ngxFacebookService: NgxFacebookService,
  ) {}

  public ngOnInit(): void {
    this._initFacebookConnection();
  }

  private _initFacebookConnection(): void {
    const config: NgxFacebookConfig = { 
      appId: '0123456789qwertyuiop',
      version: 'v4.0',
    };
    this._ngxFacebookService.init(config);
  }
}

```

It is also possible to specify other facebook api parameters that you can find in facebook [documentation](https://developers.facebook.com/docs/javascript/reference/FB.init)

## Usage

#### 1. Auth button directive

Use this directive to implement facebook authorization with your custom button:

```html
<button [ngxFbAuth]
        (authorized)="onAuthorize($event)"></button>
```

You can also specify permissions by using `[ngxFbAuth]` as input:

```html
<button [ngxFbAuth]="['instagram_basic', 'manage_pages']"
        (authorized)="onAuthorize($event)"></button>
```

Response from facebook sends to you as it is via `authorized` and `cancelled` outputs

```typescript
interface NgxFacebookAuthDetails {
  status: string;
  authResponse: {
    accessToken: string;
    expiresIn: string;
    signedRequest: string;
    userID: string;
  }
}
```

#### 2. HTTP interceptor

That http interceptor simplifies requests to facebook api. You can provide it by including in your module providers:

```typescript
{
    provide: HTTP_INTERCEPTORS,
    useClass: NgxFacebookInterceptor,
    multi: true,
}
```   

It redirects all requests with url contains `ngx-facebook` to facebook api of version listed on init, and also attaches accessToken to request params.

So request url
`yourdomain/ngx-facebook/me` will be converted to: 

`https://graph.facebook.com/v4.0/me?access_token=1234QWER`
