export class ClientDto {
  data: number;
  metadata: object;

  constructor(data: number, metadata: object) {
    this.data = data;
    this.metadata = metadata;
  }

  get getData(): number {
    return this.data;
  }

  get getMetadata(): object {
    return this.metadata;
  }

  toString(): string {
    return 'ClientDto{data=' + this.data + ', metadata=' + this.metadata + '}';
  }
}
