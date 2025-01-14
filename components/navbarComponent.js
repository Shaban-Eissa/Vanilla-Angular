import { Component } from "../core/component.js";

export class NavbarComponent extends Component {
  constructor() {
    super({
      selector: "app-navbar",
      template: `
        <nav>
          <a href="#/">Home</a>
          <a href="#/about">About</a>
        </nav>
      `,
    });
  }
}
