import { Directive, HostBinding, Input } from '@angular/core';

export const ELEMENT_APPEARANCES = ['solid', 'stroked', 'basic'] as const;
export type ElementAppearance = typeof ELEMENT_APPEARANCES[number];

@Directive({
  selector: '[aplzAppearance]',
  standalone: true,
})
export class AplazoElementAppearanceDirective {
  @Input()
  set aplzAppearance(value: ElementAppearance | null) {
    if (value == null || !ELEMENT_APPEARANCES.includes(value)) {
      this.#appearance = 'aplazo-element-appearance--basic';

      return;
    }

    switch (value) {
      case 'solid':
        this.#appearance = 'aplazo-element-appearance--solid';
        break;
      case 'stroked':
        this.#appearance = 'aplazo-element-appearance--stroked';
        break;
      case 'basic':
      default:
        this.#appearance = 'aplazo-element-appearance--basic';
    }
  }

  @HostBinding('class')
  get class() {
    return this.#appearance;
  }
  #appearance: `aplazo-element-appearance--${ElementAppearance}` =
    'aplazo-element-appearance--basic';
}
