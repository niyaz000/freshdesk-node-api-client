import HttpClient from '../client/httpClient';

export default class ScenarioAutomation {

  private prefix: string = "scenario_automations.json";

  constructor(private client: HttpClient) {
    this.client = client;
  }

  public async listAll() {
    return this.client.get(this.prefix);
  }

}