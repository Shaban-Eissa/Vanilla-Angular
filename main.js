import { AppComponent } from "./components/appComponent.js";
import { HomeComponent } from "./components/homeComponent.js";
import { AboutComponent } from "./components/aboutComponent.js";
import { Router } from "./core/router.js";

// Render the AppComponent first
new AppComponent().render();

// Define routes
const routes = [
  {
    path: "/",
    component: HomeComponent,
    template: "<home-component></home-component>",
  },
  {
    path: "/about",
    component: AboutComponent,
    template: "<about-component></about-component>",
  },
];

// Initialize Router
new Router(routes);
