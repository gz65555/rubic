export class Logger {
  private static enabled = false;
  static enable() {
    this.log = console.log.bind(this);
    this.warn = console.warn.bind(this);
    this.error = console.error.bind(this);
  }

  static log(message: string) {}

  static warn(message: string) {}

  static error(message: string) {}
}
