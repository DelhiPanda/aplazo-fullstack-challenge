# @apz/shared-ui/dashboard

> [!Note]
> All examples are based on standalone API, but the same approach can be used with the NgModule approach as described in the Angular documentation.

## How to use

For instance we want to use the AplazoDashboardComponent within the LayoutComponent

1. Import the AplazoDashboardComponent and all the needed component/directives. The easiest way is to import the cooperating directives that are relatives to the Dashboard Component. When we import the cooperating directives we can use the HeaderComponent and the SidebarComponent.

1. Declare the component in the imports array

1. Use the component in the template

1. \*\*Optional: listen for the logo Click Event. logoClick is a void event that is emmited each time the Aplazo logo is clicked.

```ts
// layout.component.ts
import { AplazoDashboardComponents } from '@apz/shared-ui/dashboard'; // note the "s" at the end of Components


@Component({
  standalone: true,
  imports: [
    ...,
    AplazoDashboardComponents
    ...,
  ]
})
export class LayoutComponent {
  doSomethingWithTheLogoClickEvent(): void{
    // do some fancy stuff when the logo click event is emmited
  }
}
```

```html
<!-- layout.component.html -->
<aplz-ui-dashboard (logoClick)="doSomethingWithTheLogoClickEvent()">
  <aplz-ui-dash-header> Some cool stuff in the header </aplz-ui-dash-header>

  <aplz-ui-dash-sidebar> Some cool stuff in the sidebar </aplz-ui-dash-sidebar>

  <!-- All the elements outside the header/sidebar wrappers are rendered as a part of the main section-->
  <section class="w-full h-screen bg-dark-background">Some cool stuff in the main</section>
</aplz-ui-dashboard>
```

> backdrop implementation inspired by
> [blog](https://www.bennadel.com/blog/3737-rendering-a-templateref-as-a-child-of-the-body-element-in-angular-9-0-0-rc-5.htm)
