import HttpClient from '../client/httpClient';

export default class Settings {

  private prefix: string = "settings/helpdesk";

  constructor(private client: HttpClient) {
    this.client = client;
  }

  public async get() {
    return this.client.get(`${this.prefix}`);
  }

}