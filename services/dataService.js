export class DataService {
  constructor() {
    if (!DataService.instance) {
      this.items = []; // Store the fetched data here
      DataService.instance = this;
    }
    return DataService.instance;
  }

  setItems(items) {
    this.items = items;
  }

  getItems() {
    return this.items;
  }
}

// Create a singleton instance of DataService
const dataService = new DataService();
export default dataService;
