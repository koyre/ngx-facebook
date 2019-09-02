import { NgModule } from '@angular/core';
import { NgxFacebookService } from './ngx-facebook.service';
import { NgxFacebookLoginDirective } from './ngx-facebook-login.directive';



@NgModule({
  declarations: [NgxFacebookLoginDirective],
  providers: [NgxFacebookService],
  exports: [NgxFacebookLoginDirective],
})
export class NgxFacebookModule { }
