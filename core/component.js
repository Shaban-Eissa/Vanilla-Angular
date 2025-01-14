export class Component {
  constructor(config) {
    this.template = config.template;
    this.selector = config.selector;
    this.element = null;
    this.data = config.data || {};
    this.methods = config.methods || {};
    this.pipes = config.pipes || {};
    this.isRendered = false;
  }

  setState(newState) {
    this.data = { ...this.data, ...newState };
    this.render();
  }

  render() {
    this.element = document.querySelector(this.selector);
    if (!this.element)
      throw new Error(`Component with selector ${this.selector} not found`);

    let template = this.template;

    // Handle interpolation and pipes
    template = template.replace(/{{([^}]+)}}/g, (match, expression) => {
      const [key, pipe] = expression.split("|").map((part) => part.trim());
      let value = this.data[key];

      if (pipe && this.pipes[pipe]) {
        value = this.pipes[pipe].transform(value);
      }

      return value !== undefined ? value : "";
    });

    // Clear the element's inner HTML before re-rendering
    this.element.innerHTML = "";

    // Render the template
    this.element.innerHTML = template;

    // Add event listeners only once
    if (!this.isRendered) {
      const eventMatches = template.match(/\([^)]+\)/g);
      if (eventMatches) {
        eventMatches.forEach((match) => {
          const eventName = match.slice(1, -1); // Remove parentheses
          const methodName = this.template.split(match)[1].split('"')[1];
          const button = this.element.querySelector(`[${match}]`);
          if (button) {
            button.addEventListener(
              eventName,
              this.methods[methodName].bind(this)
            );
          }
        });
      }

      this.isRendered = true; // Mark the component as rendered
    }
  }
}
