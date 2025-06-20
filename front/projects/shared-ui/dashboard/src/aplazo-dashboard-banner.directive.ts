import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  inject,
  Input,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

/**
 * Aplazo Dashboard Banner Directive
 *
 * This directive is used to create a banner in the dashboard.
 *
 * The current selector is a paragraph tag with the attribute `aplzDashboardBanner`.
 *
 * Passing something else that text within the paragraph will hide the banner.
 *
 * @example
 *
 * ```html
 * <aplz-ui-dashboard>
 *  <p aplzDashboardBanner>
 *   Some cool stuff in the banner
 *  </p>
 *
 *  <aplz-ui-dash-header>
 *    Some cool stuff in the header
 *  </aplz-ui-dash-header>
 *
 *  <aplz-ui-dash-sidebar>
 *   Some cool stuff in the sidebar
 *  </aplz-ui-dash-sidebar>
 *
 *  <h1>Some cool stuff in the content</h1>
 *
 * </aplz-ui-dashboard>
 *  ```
 */
@Directive({
  standalone: true,
  selector: 'p[aplzDashboardBanner]',
  host: {
    '[class]': 'classnames',
  },
})
export class AplazoDashboardBannerDirective implements AfterViewInit {
  readonly #eleRef = inject(ElementRef);
  readonly #cdr = inject(ChangeDetectorRef);

  readonly #stateChanges$ = new Subject<void>();

  readonly #classnames$ = new BehaviorSubject<{
    base: string;
    hidden: string;
  }>({
    base: 'aplazo-dash__nav-banner',
    hidden: '',
  });

  #hidden = false;
  @Input()
  set hidden(value: boolean | undefined | null) {
    this.#hidden = value ?? false;
    this.#stateChanges$.next();
  }

  get classnames() {
    const aux = new Set<string>(Object.values(this.#classnames$.value));

    return Array.from(aux).join(' ');
  }

  readonly stateChanges$ = this.#stateChanges$.asObservable();

  forceHide(): void {
    this.#classnames$.next({
      ...this.#classnames$.value,
      hidden: 'aplazo-dash__nav-banner-hidden',
    });
    this.#cdr.detectChanges();
    this.#stateChanges$.next();
  }

  hasContent(): boolean {
    const content = this.#eleRef.nativeElement.childNodes as NodeList;

    if (
      content.length <= 0 ||
      this.#classnames$.value.hidden === 'aplazo-dash__nav-banner-hidden' ||
      this.#hidden
    ) {
      return false;
    }

    return (
      Array.from(content)
        .map((node) => node.nodeType === 3)
        .filter(Boolean).length > 0
    );
  }

  ngAfterViewInit(): void {
    this.#classnames$.next({
      ...this.#classnames$.value,
      hidden: this.hasContent() ? '' : 'aplazo-dash__nav-banner-hidden',
    });
    this.#cdr.detectChanges();
    this.#stateChanges$.next();
  }
}
