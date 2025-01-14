import { Component } from "../core/component.js";
import { HttpClient } from "../core/http.js";
import { UppercasePipe } from "../pipes/uppercasePipe.js";
import dataService from "../services/dataService.js";

export class HomeComponent extends Component {
  constructor() {
    const http = new HttpClient();

    super({
      selector: "#router-outlet", // Render into the router outlet
      template: `
        <h1 HighlightDirective>Home</h1>
        <p>{{ message | uppercase }}</p>
        <button id="fetch-data">Fetch Data</button>
        <ul id="post-list"></ul>
      `,
      data: {
        message: "Welcome to the Home Page",
        items: dataService.getItems(),
      }, // Initialize with data from the service
      methods: {
        fetchData: () => {
          http
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((data) => {
              dataService.setItems(data); // Store the fetched data in the service
              this.setState({ items: data }); // Update the component state
              this.renderList(); // Manually render the list after data is fetched
            });
        },
      },
      pipes: { uppercase: UppercasePipe },
    });

    this.dataService = dataService; // Store the service instance
  }

  renderList() {
    const postList = this.element.querySelector("#post-list");
    if (!postList) return;

    // Clear the list before rendering
    postList.innerHTML = "";

    // Render each item in the list
    this.data.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.title;
      postList.appendChild(li);
    });

    console.log("HomeComponent: List rendered", this.data.items); // Debugging
  }

  render() {
    super.render(); // Call the parent render method

    // Add event listener to the button
    const fetchButton = this.element.querySelector("#fetch-data");
    if (fetchButton) {
      fetchButton.addEventListener("click", this.methods.fetchData.bind(this));
    }

    // Render the list if data is already available
    if (this.data.items.length > 0) {
      this.renderList();
    }

    console.log("HomeComponent: Component rendered", this.data.items); // Debugging
  }
}
