import { NgModule } from '@angular/core';
import { NgxFacebookService } from './ngx-facebook.service';
import { NgxFacebookAuthDirective } from './ngx-facebook-auth.directive';



@NgModule({
  declarations: [NgxFacebookAuthDirective],
  providers: [NgxFacebookService],
  exports: [NgxFacebookAuthDirective],
})
export class NgxFacebookModule { }
