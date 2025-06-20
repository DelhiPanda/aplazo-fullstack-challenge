import { Directive, HostBinding, Input } from '@angular/core';

export const ELEMENT_COLORS = [
  'light',
  'dark',
  'aplazo',
  'accent',
  'success',
  'danger',
  'warning',
  'info',
  'disabled',
] as const;
export type ElementColor = typeof ELEMENT_COLORS[number];

@Directive({
  selector: '[aplzColor]',
  standalone: true,
})
export class AplazoElementColorDirective {
  @Input()
  set aplzColor(value: ElementColor | null) {
    if (value == null || !ELEMENT_COLORS.includes(value)) {
      this.#color = 'aplazo-element-color--light';

      return;
    }

    switch (value) {
      case 'dark':
        this.#color = 'aplazo-element-color--dark';
        break;
      case 'aplazo':
        this.#color = 'aplazo-element-color--aplazo';
        break;
      case 'accent':
        this.#color = 'aplazo-element-color--accent';
        break;
      case 'success':
        this.#color = 'aplazo-element-color--success';
        break;
      case 'danger':
        this.#color = 'aplazo-element-color--danger';
        break;
      case 'warning':
        this.#color = 'aplazo-element-color--warning';
        break;
      case 'info':
        this.#color = 'aplazo-element-color--info';
        break;
      case 'disabled':
        this.#color = 'aplazo-element-color--disabled';
        break;
      case 'light':
      default:
        this.#color = 'aplazo-element-color--light';
    }
  }

  @HostBinding('class')
  get class() {
    return this.#color;
  }
  #color: `aplazo-element-color--${ElementColor}` =
    'aplazo-element-color--light';
}
