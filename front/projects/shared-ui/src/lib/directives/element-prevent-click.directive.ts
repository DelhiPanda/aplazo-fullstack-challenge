import { Directive, HostListener, inject } from '@angular/core';
import { AplazoElementDisabledDirective } from './element-disabled.directive';

@Directive({
  selector: '[aplazoElementPreventClick]',
  standalone: true,
})
export class AplazoElementPreventClickDirective {
  readonly #disabledDirective = inject(AplazoElementDisabledDirective, {
    optional: true,
    self: true,
  });

  @HostListener('click', ['$event'])
  @HostListener('dblclick', ['$event'])
  onClick(e: Event) {
    if (this.#disabledDirective?.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }
}
