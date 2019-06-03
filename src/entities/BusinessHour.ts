import HttpClient from '../client/httpClient';

export default class BusinessHour {

  private prefix: string = "business_hours";

  constructor(private client: HttpClient) {
    this.client = client;
  }

  public async get(id: number) {
    return this.client.get(`${this.prefix}/${id}`);
  }

  public async listAll() {
    return this.client.get(`${this.prefix}`);
  }

}