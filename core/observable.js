export class Observable {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  next(value) {
    this.subscribers.forEach((callback) => callback(value));
  }
}
