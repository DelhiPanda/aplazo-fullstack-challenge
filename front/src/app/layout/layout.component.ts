import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoSidenavLinkComponent } from '@apz/shared-ui/sidenav';
import { AplazoDashboardComponents } from '@apz/shared-ui/dashboard';

import { ROUTE_CONFIG, RouteKey } from '../config/routes.config';
import { clearCustomer } from '../store/customer';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [
    AplazoDashboardComponents,
    AplazoButtonComponent,
    AplazoSidenavLinkComponent,
    RouterOutlet,
    RouterLink,
  ],
})
export class LayoutComponent {
  readonly #router = inject(Router);
  readonly #store = inject(Store);

  readonly appRoutes = ROUTE_CONFIG;
  readonly appRoutesKeys: { [key: string]: string } = {
    'home': 'Inicio',
    'historial': 'Historial',
  };
  /**
   * Título de la aplicación.
   * Se actualiza dinámicamente según la ruta actual.
   */
  title = 'Aplazo';

  /**
   * Constructor del componente LayoutComponent.
   * Escucha los eventos de navegación para actualizar el título de la aplicación.
  */
  constructor() {
    // Escuchar eventos de navegación para actualizar el título
    this.#router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url.split('/').pop() as RouteKey;

        this.title = this.appRoutes[currentRoute] || 'Aplazo';
      }
    });
  }

  clickLogo(): void {
    this.#router.navigate([ROUTE_CONFIG.home]);
  }

  logout() {
    this.#store.dispatch(clearCustomer());
    this.#router.navigate(['/login'])
  }
}
