export class Logger {
  static debugEnabled: boolean = false;
  static log(...args: any[]): void {
    console.log(...args);
  }

  static error(...args: any[]): void {
    console.error(...args);
  }

  static debug(...args: any[]): void {
    // Add debug logging as needed
    if (this.debugEnabled) console.debug(...args);
  }
}
