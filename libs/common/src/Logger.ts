export class Logger {
  static log(message: string) {
    console.log(message);
  }

  static error(err: unknown) {
    console.error(err);
  }
}
