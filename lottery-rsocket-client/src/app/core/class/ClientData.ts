export class ClientData {
  numbersAmount: number;
  special: boolean;

  constructor(numbersAmount: number, special: boolean) {
    this.numbersAmount = numbersAmount;
    this.special = special;
  }

  get getNumbersAmount(): number {
    return this.numbersAmount;
  }

  get isSpecial(): boolean {
    return this.special;
  }

  toString(): string {
    return (
      'ClientData{numbersAmount=' +
      this.numbersAmount +
      ', special=' +
      this.special +
      '}'
    );
  }
}
