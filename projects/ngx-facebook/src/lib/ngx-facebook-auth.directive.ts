import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { NgxFacebookService } from './ngx-facebook.service';
import { NgxFacebookAuthDetails } from './models';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Directive({
  selector: '[ngxFbAuth]',
})
export class NgxFacebookAuthDirective implements OnDestroy {
  @Input('ngxFbAuth')
  public permissions: string[] = [];

  @Output()
  public readonly authorized = new EventEmitter<NgxFacebookAuthDetails>();
  @Output()
  public readonly cancelled = new EventEmitter<NgxFacebookAuthDetails>();

  constructor(private readonly _ngxFacebookService: NgxFacebookService) {}

  public ngOnDestroy(): void {}

  @HostListener('click', ['$event'])
  public onClick(): void {
    this._ngxFacebookService
      .login(this.permissions)
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: NgxFacebookAuthDetails) => this.authorized.emit(response),
        (response: NgxFacebookAuthDetails) => this.cancelled.emit(response),
      );
  }
}
