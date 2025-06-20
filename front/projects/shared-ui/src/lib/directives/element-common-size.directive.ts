import { Directive, HostBinding, Input } from '@angular/core';

export const COMMON_SIZE = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
export type CommonSize = typeof COMMON_SIZE[number];

@Directive({
  selector: '[aplzCommonSize]',
  standalone: true,
})
export class AplazoCommonSizeDirective {
  @Input()
  set size(value: CommonSize | null) {
    if (value == null || !COMMON_SIZE.includes(value)) {
      this.#classSize = '';
      return;
    }

    switch (value) {
      case 'xs':
        this.#classSize = 'aplazo-element-size--xs';
        break;
      case 'sm':
        this.#classSize = 'aplazo-element-size--sm';
        break;
      case 'md':
        this.#classSize = 'aplazo-element-size--md';
        break;
      case 'lg':
        this.#classSize = 'aplazo-element-size--lg';
        break;
      case 'xl':
        this.#classSize = 'aplazo-element-size--xl';
        break;
      case '2xl':
        this.#classSize = 'aplazo-element-size--2xl';
        break;
      default:
        this.#classSize = '';
    }
  }

  @HostBinding('class')
  get class(): string {
    return this.#classSize;
  }
  #classSize: `aplazo-element-size--${CommonSize}` | '' = '';
}
