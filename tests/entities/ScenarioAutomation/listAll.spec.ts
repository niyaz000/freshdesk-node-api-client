const expect = require('chai').expect;
import ScenarioAutomation from '../../../src/entities/ScenarioAutomation';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("ScenarioAutomation api: listAll", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should fetch all ScenarioAutomation", async () => {
    const scenario = new ScenarioAutomation(client);
    const result = await scenario.listAll();
    expect(result.status).to.equal(200);
    expect(result.statusText).to.equal('OK');
    expect(result.body[0].id).to.equal(675048);
  });

});