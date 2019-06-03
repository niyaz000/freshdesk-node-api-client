export default class Response {

  public status: number;
  public statusText: string;
  public headers: any;
  public body: any

  constructor(response: any) {
    this.status = response.status;
    this.statusText = response.statusText;
    this.headers = response.headers;
    this.body = response.data;
  }

}