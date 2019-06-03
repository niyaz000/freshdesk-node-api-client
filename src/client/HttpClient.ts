const axios = require('axios');
import Response from './Response';

export default class HttpClient {

  private axios: any;
  constructor(private domainName: string, private apiKey: string) {
    this.domainName = domainName;
    this.apiKey = apiKey;
    this.axios = this.axioClient();
  }

  private axioClient(): any {
    return axios.create({
      baseURL: `${this.domainName}/api/v2/`,
      auth: {
        username: this.apiKey,
        password: 'X'
      }
    });
  }

  public async post(payload: any, url: string, config?: any) {
    try {
      return new Response(await this.axios.post(url, payload, config));
    } catch (error) {
      return new Response(error.response);
    }
  }

  public async put(payload: any, url: string, config?: any) {
    try {
      return new Response(await this.axios.put(url, payload, config));
    } catch (error) {
      return new Response(error.response);
    }
  }

  public async get(url: string) {
    try {
      return new Response(await this.axios.get(url));
    } catch (error) {
      return new Response(error.response);
    }
  }

  public async delete(url: string) {
    try {
      return new Response(await this.axios.delete(url));
    } catch (error) {
      return new Response(error.response);
    }
  }

}