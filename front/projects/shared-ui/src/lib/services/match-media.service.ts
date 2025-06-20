/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import {
  Observable,
  combineLatest,
  fromEvent,
  map,
  of,
  shareReplay,
  startWith,
} from 'rxjs';
import { MediaQueryScreen } from '../entities/screens';

/** Simple service to match screen media queries
 *
 * Only works in the browser, so it's important to use it only in components.
 *
 * The screen sizes are the same as in tailwind screens preset.
 * and we have an entity that describes the screen sizes within entities/screens.ts
 *
 * inspired by:
 * https://admin.indepth.dev/responsive-angular/
 *
 */
@Injectable({ providedIn: 'root' })
export class AplazoMatchMediaService {
  readonly #platformId = inject(PLATFORM_ID);
  readonly #window = inject(DOCUMENT).defaultView;

  matchXsScreen$ = this.match$('screen and (min-width: 375px)').pipe(
    startWith(this.#window?.matchMedia('screen and (min-width: 375px)'))
  );
  matchSmScreen$ = this.match$('screen and (min-width: 540px)').pipe(
    startWith(this.#window?.matchMedia('screen and (min-width: 540px)'))
  );
  matchMdScreen$ = this.match$('screen and (min-width: 720px)').pipe(
    startWith(this.#window?.matchMedia('screen and (min-width: 720px)'))
  );
  matchLgScreen$ = this.match$('screen and (min-width: 960px)').pipe(
    startWith(this.#window?.matchMedia('screen and (min-width: 960px)'))
  );
  matchXlScreen$ = this.match$('screen and (min-width: 1140px)').pipe(
    startWith(this.#window?.matchMedia('screen and (min-width: 1140px)'))
  );
  match2xlScreen$ = this.match$('screen and (min-width: 1320px)').pipe(
    startWith(this.#window?.matchMedia('screen and (min-width: 1320px)'))
  );

  /** Stream with the size of the screen
   * @description
   * The screen sizes are the same as in tailwind screens preset.
   * @example
   * this.aplazoMatchMediaService.screenSize$.subscribe((size) => {
   *  console.log(size); // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
   * });
   */
  screenSize$: () => Observable<string> = () => {
    if (!isPlatformBrowser(this.#platformId) || this.#window == null) {
      return of('xs');
    }
    return combineLatest({
      xs: this.matchMedia('screen and (min-width: 375px)'),
      sm: this.matchMedia('screen and (min-width: 540px)'),
      md: this.matchMedia('screen and (min-width: 720px)'),
      lg: this.matchMedia('screen and (min-width: 960px)'),
      xl: this.matchMedia('screen and (min-width: 1140px)'),
      '2xl': this.matchMedia('screen and (min-width: 1320px)'),
      '3xl': this.matchMedia('screen and (min-width: 1440px)'),
      '4xl': this.matchMedia('screen and (min-width: 1680px)'),
      '5xl': this.matchMedia('screen and (min-width: 1920px)'),
    }).pipe(
      map(
        (sizes) =>
          Object.entries(sizes)
            .map(([size, matches]) => (matches ? size : null))
            .filter(Boolean)
            .pop() ?? 'xs'
      )
    );
  };

  syncMatch(mediaQueryList: MediaQueryScreen): boolean {
    return this.#window?.matchMedia(mediaQueryList).matches ?? false;
  }

  match$(mediaQueryList: MediaQueryScreen): Observable<{ matches: boolean }> {
    return this.#window == null
      ? of({ matches: false })
      : fromEvent<MediaQueryListEvent>(
          this.#window.matchMedia(mediaQueryList),
          'change'
        ).pipe(
          map((matchEvent) => {
            return { matches: matchEvent.matches };
          }),
          shareReplay(1)
        );
  }

  private matchMedia(mediaQueryList: MediaQueryScreen) {
    return fromEvent<MediaQueryListEvent>(
      this.#window!.matchMedia(mediaQueryList),
      'change'
    ).pipe(
      startWith(this.#window!.matchMedia(mediaQueryList)),
      map((evt) => evt.matches)
    );
  }
}
