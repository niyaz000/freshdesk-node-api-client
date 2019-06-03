const expect = require('chai').expect;
import Settings from '../../../src/entities/Settings';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("Settings Entity", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should fetch Settings", async () => {
    const settings = new Settings(client);
    const result = await settings.get();
    expect(result.status).to.equal(200);
    expect(result.statusText).to.equal('OK');
    expect(result.body.primary_language).to.equal("en");
  });

});