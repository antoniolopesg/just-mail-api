export class HttpException {
  constructor(status, body) {
    this.status = status;
    this.body = body;
    this.name = this.constructor.name;
  }
}
