const expect = require('chai').expect;
import SlaPolicy from '../../../src/entities/SlaPolicy';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("SlaPolicy Entity", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should return all SlaPolicies available", async () => {
    const sla = new SlaPolicy(client);
    const result = await sla.listAll();
    expect(result.status).to.equal(200);
    expect(result.statusText).to.equal('OK');
    expect(result.body[0].id).to.equal(1000000055253);
  });

});