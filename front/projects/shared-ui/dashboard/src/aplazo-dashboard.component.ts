import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EmbeddedViewRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {
  AplazoClickOutsideDirective,
  AplazoMatchMediaService,
  MediaQueryScreen,
} from '@apz/shared-ui';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import {
  BehaviorSubject,
  Subject,
  lastValueFrom,
  map,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { AplazoDashboardBannerDirective } from './aplazo-dashboard-banner.directive';
import { AplazoDashboardHeaderComponent } from './aplazo-dashboard-header.component';
import { AplazoDashboardSidebarComponent } from './aplazo-dashboard-sidebar.component';

/** Aplazo Dashboard Layout Component
 *
 * This component is only the skeleton of the dashboard,
 * with the aim to ease the creation of new dashboards.
 *
 * @example
 * Import required components
 *
 * ```ts
 * import {
 * AplazoDashboardComponents,
 * } from '@apz/shared-ui/dashboard';
 * ```
 *
 * Declare in the imports
 * ```ts
 * {
 * standalone: true,
 * imports: [
 * AplazoDashboardComponents,
 * ],
 * }
 * ```
 *
 * Use the components
 * ```html
 *  <aplz-ui-dashboard>
 *    <aplz-ui-dash-header>
 *      Some cool stuff in the header
 *    </aplz-ui-dash-header>
 *
 *    <aplz-ui-dash-sidebar>
 *      Some cool stuff in the sidebar
 *    </aplz-ui-dash-sidebar>
 *
 *    <section class="w-full h-screen bg-dark-background">
 *      Some cool stuff in the main
 *    </section>
 *  </aplz-ui-dashboard>
 * ```
 *
 * backdrop implementation inspired by
 * https://www.bennadel.com/blog/3737-rendering-a-templateref-as-a-child-of-the-body-element-in-angular-9-0-0-rc-5.htm
 */
@Component({
  selector: 'aplz-ui-dashboard',
  standalone: true,
  templateUrl: './aplazo-dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AplazoLogoComponent,
    AplazoButtonComponent,
    AplazoClickOutsideDirective,
    NgClass,
    NgIf,
    AsyncPipe,
  ],
  styleUrls: ['./aplazo-dashboard.component.css'],
})
export class AplazoDashboardComponent
  implements OnInit, OnDestroy, AfterContentInit
{
  readonly #hiddenSidebarClassname = 'aplazo-dash__sidebar--hidden';
  readonly #largeScreenMediaQuery: MediaQueryScreen =
    'screen and (min-width: 960px)';

  readonly #sidebarClassnames$ = new BehaviorSubject<{
    base: string;
    withBanner: string;
    hidden: string;
  }>({
    base: 'aplazo-dash__sidebar',
    withBanner: '',
    hidden: this.#hiddenSidebarClassname,
  });

  readonly sidebarClassnames$ = this.#sidebarClassnames$.pipe(
    map((classnames) => Object.values(classnames).join(' '))
  );

  readonly #matchMedia = inject(AplazoMatchMediaService);
  readonly #matchMediaService: AplazoMatchMediaService = inject(
    AplazoMatchMediaService
  );
  readonly #changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  readonly #viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  readonly #router = inject(Router);

  readonly #destroy = new Subject<void>();
  readonly #navigating$ = new Subject<boolean>();

  readonly #matchLargeScreen$ = this.#matchMediaService.match$(
    this.#largeScreenMediaQuery
  );

  #backdropEmbeddedView: EmbeddedViewRef<unknown> | null = null;

  /** ## Reference to the backdrop
   *
   * @ignore
   */
  @ViewChild('aplzUiBackdrop', {
    read: TemplateRef,
    static: true,
  })
  backdropTemplate: TemplateRef<unknown>;

  @ContentChild(AplazoDashboardBannerDirective, {
    static: false,
  })
  banner: AplazoDashboardBannerDirective;

  readonly #bannerChanges$ = new BehaviorSubject<boolean>(false);

  readonly bannerContent$ = this.#bannerChanges$.pipe(
    map((flag) => ({ hasContent: flag }))
  );

  /** Event that is emitted when the logo is clicked
   *
   * @default noop
   *
   * @example
   *
   * ```html
   * <aplz-ui-dashboard (logoClick)="doSomeWithLogoClick()">
   * ...
   * </aplz-ui-dashboard>
   * ```
   *
   */
  @Output()
  logoClick = new EventEmitter<void>();

  forceBannerHide(): void {
    this.banner?.forceHide();
  }

  /** ## Method that hides the sidebar */
  hideSidebar(): void {
    this.setHiddenSidebarClassname();
    this.destroyBackdrop();
    this.#changeDetector.markForCheck();
  }

  /** ## Method that shows the sidebar for small screens */
  showSidebarForMobile(): void {
    this.setShowSidebarClassname();
    this.createBackdrop();
    this.#changeDetector.markForCheck();
  }

  /** ## Method that shows the sidebar for large screens */
  showSidebarForLargeScreen(): void {
    this.setShowSidebarClassname();
    this.destroyBackdrop();
    this.#changeDetector.markForCheck();
  }

  /** ## Method that toggles the sidebar */
  toggleSidebarForMobile(): void {
    if (this.#sidebarClassnames$.getValue().hidden) {
      this.showSidebarForMobile();
      return;
    }
    this.hideSidebar();
  }

  async clickOutside(): Promise<void> {
    const isMobile = await lastValueFrom(
      this.#matchMedia.matchLgScreen$.pipe(
        take(1),
        map((media) => !media?.matches || false)
      )
    );

    const isNavigating = await lastValueFrom(this.#navigating$.pipe(take(1)));

    if (isMobile && isNavigating) {
      this.hideSidebar();
    }
  }

  ngOnInit(): void {
    this.setInitialSidebarState();

    this.#matchLargeScreen$
      .pipe(takeUntil(this.#destroy))
      .subscribe((match) => {
        if (match.matches) {
          this.showSidebarForLargeScreen();
        } else {
          this.hideSidebar();
        }
      });
  }

  ngAfterContentInit(): void {
    this.banner?.stateChanges$
      .pipe(
        takeUntil(this.#destroy),
        tap(() => {
          this.#bannerChanges$.next(this.banner?.hasContent() ?? false);

          if (this.banner?.hasContent()) {
            this.#sidebarClassnames$.next({
              ...this.#sidebarClassnames$.getValue(),
              withBanner: 'with-banner',
            });
          } else {
            this.#sidebarClassnames$.next({
              ...this.#sidebarClassnames$.getValue(),
              withBanner: '',
            });
          }
        })
      )
      .subscribe();

    this.#router.events.pipe(takeUntil(this.#destroy)).subscribe({
      next: (event) => {
        if (event instanceof NavigationStart) {
          this.#navigating$.next(true);
        }

        this.#navigating$.next(false);
      },
      error: (error) => {
        console.error('Error while navigating', error);
        this.#navigating$.next(false);
      },
    });
  }

  ngOnDestroy(): void {
    this.#destroy.next();
    this.#destroy.complete();
  }

  private setHiddenSidebarClassname(): void {
    this.#sidebarClassnames$.next({
      ...this.#sidebarClassnames$.getValue(),
      hidden: this.#hiddenSidebarClassname,
    });
  }

  private setShowSidebarClassname(): void {
    this.#sidebarClassnames$.next({
      ...this.#sidebarClassnames$.getValue(),
      hidden: '',
    });
  }

  private createBackdrop(): void {
    if (!this.#matchMediaService.syncMatch(this.#largeScreenMediaQuery)) {
      this.#backdropEmbeddedView = this.#viewContainerRef.createEmbeddedView(
        this.backdropTemplate
      );

      this.#backdropEmbeddedView.detectChanges();

      for (const node of this.#backdropEmbeddedView.rootNodes) {
        document.body.appendChild(node);
      }
    }
  }

  private destroyBackdrop(): void {
    if (this.#backdropEmbeddedView) {
      this.#backdropEmbeddedView.destroy();
      this.#backdropEmbeddedView = null;
    }
  }

  private setInitialSidebarState(): void {
    if (this.#matchMediaService.syncMatch(this.#largeScreenMediaQuery)) {
      this.setShowSidebarClassname();
    } else {
      this.setHiddenSidebarClassname();
    }
    this.#changeDetector.markForCheck();
  }
}

export const AplazoDashboardComponents = [
  AplazoDashboardComponent,
  AplazoDashboardHeaderComponent,
  AplazoDashboardSidebarComponent,
  AplazoDashboardBannerDirective,
] as const;
