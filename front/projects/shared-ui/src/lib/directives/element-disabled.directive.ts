import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[aplazoElementDisabled]',
  standalone: true,
})
export class AplazoElementDisabledDirective {
  @HostBinding('class.disabled')
  @Input()
  disabled = false;

  @HostBinding('attr.disabled')
  protected get nativeDisabled(): '' | null {
    return this.disabled ? '' : null;
  }
}
