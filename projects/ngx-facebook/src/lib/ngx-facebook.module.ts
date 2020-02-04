import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgxFacebookAuthDirective } from './ngx-facebook-auth.directive';
import { NgxFacebookService } from './ngx-facebook.service';



@NgModule({
  declarations: [NgxFacebookAuthDirective],
  exports: [NgxFacebookAuthDirective],
})
export class NgxFacebookModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxFacebookModule,
      providers: [NgxFacebookService],
    };
  }
}
