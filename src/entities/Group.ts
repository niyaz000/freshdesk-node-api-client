import HttpClient from '../client/httpClient';

export default class Group {

  private prefix: string = "groups";

  constructor(private client: HttpClient) {
    this.client = client;
  }

  public async create(payload: any) {
    return this.client.post(payload, this.prefix);
  }

  public async get(id: number) {
    return this.client.get(`${this.prefix}/${id}`);
  }

  public async listAll() {
    return this.client.get(this.prefix);
  }

  public async update(id: number, payload: any) {
    return this.client.put(payload, `${this.prefix}/${id}`);
  }

  public async delete(id: number) {
    return this.client.delete(`${this.prefix}/${id}`);
  }
}
