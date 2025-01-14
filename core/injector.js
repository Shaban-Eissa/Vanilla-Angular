export class Injector {
  static services = {};

  static register(name, service) {
    this.services[name] = service;
  }

  static get(name) {
    return this.services[name];
  }
}
