import HttpClient from '../client/httpClient';

export default class SlaPolicy {

  private prefix: string = "sla_policies";

  constructor(private client: HttpClient) {
    this.client = client;
  }

  public async create(payload: any) {
    return this.client.post(payload, `${this.prefix}`);
  }

  public async listAll() {
    return this.client.get(`${this.prefix}`);
  }

  public async update(payload: any, id: number) {
    return this.client.put(payload, `${this.prefix}/${id}`);
  }

}