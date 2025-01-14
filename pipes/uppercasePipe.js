import { Pipe } from "../core/pipe.js";

export class UppercasePipe extends Pipe {
  static transform(value) {
    return value.toUpperCase();
  }
}
