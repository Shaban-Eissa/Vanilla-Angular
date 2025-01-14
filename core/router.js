export class Router {
  constructor(routes) {
    this.routes = routes;
    this.init();
  }

  init() {
    window.addEventListener("hashchange", () => this.route());
    this.route();
  }

  route() {
    const path = window.location.hash.slice(1) || "/";
    const route = this.routes.find((r) => r.path === path);
    if (route) {
      if (typeof route.component === "function") {
        const routerOutlet = document.getElementById("router-outlet");
        if (!routerOutlet) throw new Error("Router outlet not found");

        // Clear the router outlet
        routerOutlet.innerHTML = "";

        // Render the component into the router outlet
        const component = new route.component({
          selector: "#router-outlet", // Render into the router outlet
          template: route.template,
        });
        component.render();
      } else {
        console.error(
          `Route component for path "${path}" is not a valid constructor.`
        );
      }
    } else {
      console.error(`No route found for path "${path}".`);
    }
  }
}
