import { NgClass, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SecurityContext,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export const LOGO_SIZE = ['sm', 'md', 'base', 'lg', 'xl'] as const;
export type LogoSize = (typeof LOGO_SIZE)[number];

/** ## Usage
 *
 * ### Import the component
 *
 * ```ts
 * // within the component that is using the logo
 * import { AplazoLogoComponent } from '@apz/shared-ui/logo';
 * ```
 *
 * ### Declare in the imports
 *
 * ```ts
 * // within the component that is using the logo
 * @Component({
 * ...,
 * standalone: true,
 * imports: [
 *  ...,
 * AplazoLogoComponent,
 * ],
 * ```
 *
 * ### Use the component
 *
 * ```html
 * <aplz-ui-logo size="sm"></aplz-ui-logo>
 * ```
 *
 * > Note: the NgOptimizedImage Directive throws a warning if there is no preconnect tag in the head of the document.
 *
 * > Preconnecting to the origin(s) that serve priority images ensures that these images are delivered as soon as possible. To fix this, please add the following element into the <head> of the document: <link rel="preconnect" href="https://aplazoassets.s3.us-west-2.amazonaws.com">
 *
 */
@Component({
  selector: 'aplz-ui-logo',
  standalone: true,
  imports: [NgOptimizedImage, NgClass],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<picture [ngClass]="logoContainerClassnames">
    <img
      priority
      alt="aplazo logo"
      class="aplazo-logo"
      width="152"
      height="35"
      [ngSrc]="logoUrl"
    />
  </picture>`,
  styleUrls: ['./aplazo-logo.component.css'],
})
export class AplazoLogoComponent {
  readonly #sanitizer: DomSanitizer = inject(DomSanitizer);

  readonly #classnames: {
    base: string;
    sizeModifier: `aplazo-logo__container--${LogoSize}`;
  } = {
    base: 'aplazo-logo__container',
    sizeModifier: 'aplazo-logo__container--base',
  };

  readonly #imgSize: {
    width: number;
    height: number;
  } = {
    width: 160,
    height: 36.7,
  };

  get width(): number {
    return this.#imgSize.width;
  }

  get height(): number {
    return this.#imgSize.height;
  }

  get logoContainerClassnames(): string {
    return Object.values(this.#classnames).filter(Boolean).join(' ');
  }

  /** @ignore */
  readonly logoUrl =
    this.#sanitizer.sanitize(
      SecurityContext.URL,
      'https://aplazoassets.s3.us-west-2.amazonaws.com/logos/new-aplazo-logo-colores.svg'
    ) ?? '';

  /** Sets the size of the logo
   *
   * @default base
   */
  @Input()
  public set size(value: LogoSize | null) {
    let modifier = this.#classnames.sizeModifier;

    switch (value) {
      case 'sm':
        modifier = 'aplazo-logo__container--sm';
        this.#imgSize.width = 80;
        this.#imgSize.height = 18.3;
        break;
      case 'md':
        modifier = 'aplazo-logo__container--md';
        this.#imgSize.width = 128;
        this.#imgSize.height = 29.5;
        break;
      case 'lg':
        modifier = 'aplazo-logo__container--lg';
        this.#imgSize.width = 192;
        this.#imgSize.height = 44;
        break;
      case 'xl':
        modifier = 'aplazo-logo__container--xl';
        this.#imgSize.width = 256;
        this.#imgSize.height = 58.8;
        break;
      default:
        modifier = 'aplazo-logo__container--base';
        this.#imgSize.width = 160;
        this.#imgSize.height = 36.7;
    }

    this.#classnames.sizeModifier = modifier;
  }
}
