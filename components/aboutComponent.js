import { Component } from "../core/component.js";

export class AboutComponent extends Component {
  constructor() {
    super({
      selector: "#router-outlet", // Render into the router outlet
      template: `
        <h1>About</h1>
        <p>This is the About Page</p>
      `,
    });
  }
}
