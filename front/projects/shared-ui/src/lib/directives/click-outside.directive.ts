import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';

/**
 *
 * idea from
 * https://plainenglish.io/blog/creating-an-angular-directive-to-detect-clicking-outside-an-object-afd6c07212ef
 */
@Directive({
  selector: '[aplzClickOutside]',
  exportAs: 'clickOutside',
  standalone: true,
  host: {
    '(document:click)': '__onClick($event, $event.target)',
  },
})
export class AplazoClickOutsideDirective {
  readonly #elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  @Output() clickOutside = new EventEmitter<MouseEvent>();

  __onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickedInside =
      this.#elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}
