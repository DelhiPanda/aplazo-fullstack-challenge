import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  AplazoCommonSizeDirective,
  AplazoElementAppearanceDirective,
  AplazoElementColorDirective,
  AplazoElementDisabledDirective,
  AplazoElementPreventClickDirective,
} from '@apz/shared-ui';

interface ButtonClassnamesConfig {
  base: string;
  fullWidth: string;
  rounded: string;
}

/** AplazoButtonComponent
 *
 * Inputs that are available for the component:
 *
 * aplzAppearance - The appearance of the button ('basic', 'stroked', 'solid')
 *
 * aplzColor - The color of the button ('light', 'dark', 'aplazo', 'accent', 'success', 'danger', 'warning', 'info')
 *
 * size - The size of the button ('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl')
 *
 * disabled - Wheather the button is disabled or not
 *
 * fullWidth - Wheather the button should be full width or not
 *
 * rounded - Wheather the button should be rounded or not
 *
 * Usage
 *
 * Import the component
 *
 * ```ts
 * import { AplazoButtonComponent } from '@apz/shared-ui/button';
 * ```
 *
 * Declare in the imports
 *
 * ```ts
 * @Component({ imports: [ AplazoButtonComponent ], })
 * ```
 *
 * Use the component
 *
 * ```html
 *  <button
 *   aplzButton
 *   type="submit"
 *   aplzAppearance="solid"
 *   size="md"
 *   aplzColor="dark"
 *   [fullWidth]="true"
 *   [rounded]="true"
 *   [disabled]="true"
 * >
 *   Submit
 * </button>
 * ```
 *
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[aplzButton], a[aplzButton]',
  standalone: true,
  imports: [NgClass],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content></ng-content> `,
  hostDirectives: [
    {
      directive: AplazoElementAppearanceDirective,
      inputs: ['aplzAppearance'],
    },
    {
      directive: AplazoElementColorDirective,
      inputs: ['aplzColor'],
    },
    {
      directive: AplazoElementDisabledDirective,
      inputs: ['disabled'],
    },
    {
      directive: AplazoElementPreventClickDirective,
    },
    {
      directive: AplazoCommonSizeDirective,
      inputs: ['size'],
    },
  ],
  styleUrls: ['./aplazo-button.component.css'],
})
export class AplazoButtonComponent {
  readonly #buttonClassnames: ButtonClassnamesConfig = {
    base: 'aplazo-base-button',
    fullWidth: '',
    rounded: '',
  };

  /** Overrides the base Aplazo's button classnames
   *
   * @default null
   */
  @HostBinding('class')
  @Input()
  set class(value: string | null) {
    if (value == null || value === '') {
      this.#class = null;
      return;
    }

    this.#class = value;
  }
  get class(): string | null {
    const classes = new Set<string>([
      ...Object.values(this.#buttonClassnames).filter(Boolean),
    ]);
    if (this.#class != null) {
      this.#class.split(' ').forEach((c) => classes.add(c));
    }

    return Array.from(classes).join(' ');
  }
  #class: string | null = null;

  /** Wheather the button should be full width or not
   *
   * When the value is not present, the default value is `false`
   * @default false
   */
  @Input()
  set fullWidth(value: boolean | undefined) {
    if (value == null || value === false) {
      this.#buttonClassnames.fullWidth = '';
      return;
    }

    this.#buttonClassnames.fullWidth = 'btn-full-width';
  }

  /** Wheather the button should be rounded or not
   *
   * When the value is not present, the default value is `false`
   * @default false
   */
  @Input()
  public set rounded(value: boolean | undefined) {
    if (value == null || value === false) {
      this.#buttonClassnames.rounded = '';
      return;
    }

    this.#buttonClassnames.rounded = 'btn-rounded';
  }
}
