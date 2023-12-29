export class Logger {
  static debugEnabled: boolean = process.env.NDCLIDEBUG
    ? process.env.NDCLIDEBUG === "true"
      ? true
      : false
    : false || false;

  private static getColorCode(color: string): string {
    const colorMap: { [key: string]: string } = {
      reset: "\x1b[0m",
      bright: "\x1b[1m",
      dim: "\x1b[2m",
      underscore: "\x1b[4m",
      blink: "\x1b[5m",
      reverse: "\x1b[7m",
      hidden: "\x1b[8m",
      fgBlack: "\x1b[30m",
      fgRed: "\x1b[31m",
      fgGreen: "\x1b[32m",
      fgYellow: "\x1b[33m",
      fgBlue: "\x1b[34m",
      fgMagenta: "\x1b[35m",
      fgCyan: "\x1b[36m",
      fgWhite: "\x1b[37m",
      bgBlack: "\x1b[40m",
      bgRed: "\x1b[41m",
      bgGreen: "\x1b[42m",
      bgYellow: "\x1b[43m",
      bgBlue: "\x1b[44m",
      bgMagenta: "\x1b[45m",
      bgCyan: "\x1b[46m",
      bgWhite: "\x1b[47m",
    };

    return colorMap[color] || colorMap.reset;
  }

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

  static logColored(color: string, ...args: any[]): void {
    const colorCode = this.getColorCode(color);
    console.log(colorCode, ...args, this.getColorCode("reset"));
  }

  static logSuccess(...args: any[]): void {
    this.logColored("fgGreen", ...args);
  }

  static logWarning(...args: any[]): void {
    this.logColored("fgYellow", ...args);
  }

  static logFatal(...args: any[]): void {
    this.logColored("fgRed", ...args);
  }
}
