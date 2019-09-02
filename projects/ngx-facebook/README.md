# NgxFacebookLibrary

make facebook and angular work together again <3 

## installation

##### 1. add library to your package

###### 1.1. via NPM
 
`npm i --save @koyre/ngx-facebook`

###### 1.1. via Yarn

`yarn add @koyre/ngx-facebook`

##### 2. import `FacebookModule` into your target module

e.g. your app's root module
```angular2
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



