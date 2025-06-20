import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'aplz-ui-dash-header',
  standalone: true,
  template: `<ng-content></ng-content>`,
})
export class AplazoDashboardHeaderComponent {
  @HostBinding('class')
  @Input()
  class = 'flex-grow flex-shrink-0';
}
