import {
  Directive,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
} from '@angular/core';
import { NgxFacebookService } from './ngx-facebook.service';
import { IFacebookAuthResponse } from './models';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Directive({
  selector: '[ngxFbLoginButton]',
})
export class NgxFacebookLoginDirective implements OnDestroy {
  @Output()
  public readonly login = new EventEmitter<IFacebookAuthResponse>();

  constructor(private readonly _ngxFacebookService: NgxFacebookService) {}

  public ngOnDestroy(): void {}

  @HostListener('click', ['$event'])
  public onClick(_: any): void {
    const permissions = ['instagram_basic', 'pages_show_list'];

    this._ngxFacebookService
      .login(permissions)
      .pipe(untilDestroyed(this))
      .subscribe(response => {
        this.login.emit(response);
      });
  }
}
