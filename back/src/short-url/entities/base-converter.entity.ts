export class BaseConverter {
  private static BASE = 62;
  private static CHARSET =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  static toBase62(value: number): string {
    const result: string[] = [];
    while (true) {
      if (value < this.BASE) {
        result.unshift(this.CHARSET[value]);
        break;
      }
      const rest = value % this.BASE;
      result.unshift(this.CHARSET[rest]);
      value = Math.floor(value / this.BASE);
    }

    return result.toString().replaceAll(',', '');
  }
  static toBase10(value: string) {
    const val = value.split('').reduceRight((acc, value, index, arr) => {
      const reversedIndex = arr.length - index - 1;
      if (reversedIndex === 0) {
        acc = this.CHARSET.indexOf(value);
      } else {
        acc += this.CHARSET.indexOf(value) * this.BASE ** reversedIndex;
      }
      return acc;
    }, 0);

    return val;
  }
}
