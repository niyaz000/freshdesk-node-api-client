import HttpClient from '../client/httpClient';
const fs = require('fs');
const FormData = require('form-data');

export default class Company {

  private prefix: string = "companies";

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

  public async listAllWithPagination(pageNumber: number, perPageCount: number) {
    return this.client.get(encodeURI(`${this.prefix}?per_page=${perPageCount}&page=${pageNumber}`));
  }

  public async update(id: number, payload: any) {
    return this.client.put(payload, `${this.prefix}/${id}`);
  }

  public async delete(id: number) {
    return this.client.delete(`${this.prefix}/${id}`);
  }

  public async listAllFields() {
    return this.client.get("company_fields");
  }

  public async export(fields: any) {
    const response = await this.triggerExport(fields);
    if (response.status == 200) {
      return this.getExportUrl(response.body.id);
    }
    return response;
  }

  public async triggerExport(payload: any) {
    return this.client.post(payload, `${this.prefix}/export`);
  }

  public async getExportUrl(id: string) {
    return this.client.get(`${this.prefix}/export/${id}`);
  }

  public async listAllImports(status?: string) {
    if (status) {
      return this.client.get(`${this.prefix}/imports?status=${status}`);
    }
    return this.client.get(`${this.prefix}/imports`);
  }

  public async getImport(id: number) {
    return this.client.get(`${this.prefix}/imports/${id}`);
  }

  public async triggerImport(filePath: string, fields: any) {
    const name = filePath.split("/").pop();
    const data = new FormData();
    data.append('file', fs.createReadStream(filePath), name);
    for (let prop in fields) {
      data.append(`fields[${prop}]`, fields[prop]);
    }
    return this.client.post(data, `${this.prefix}/imports`, { headers: data.getHeaders() });
  }

  public async cancelImport(id: number) {
    return this.client.put(null, `${this.prefix}/imports/${id}/cancel`);
  }

  public async filter(query: string) {
    return this.client.get(encodeURI(`search/${this.prefix}?query="${query}"`));
  }
}
