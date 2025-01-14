import { Component } from "../core/component.js";

export class AppComponent extends Component {
  constructor() {
    super({
      selector: "#app",
      template: `
        <nav>
          <a href="#/">Home</a>
          <a href="#/about">About</a>
        </nav>
        <div id="router-outlet"></div>
      `,
    });
  }
}
