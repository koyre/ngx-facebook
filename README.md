# NgxFacebookLibrary

make facebook and angular work together again <3 

## installation

##### 1. add library to your package

###### 1.1. via NPM
 
`npm i --save ngx-facebook`

###### 1.1. via Yarn

`yarn add ngx-facebook`

##### 2. import `FacebookModule` into your target module

e.g. your app's root module
```angular2
import { NgxFacebookModule } from 'ngx-facebook';
 
@NgModule({
  ...
  imports: [
    NgxFacebookModule.forRoot()
  ],
  ...
})
export class AppModule { }
```



