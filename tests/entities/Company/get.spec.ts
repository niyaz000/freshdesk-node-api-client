const expect = require('chai').expect;
import Company from '../../../src/entities/Company';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("Company Api: get", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should fetch a company entity with given id and result should be 200", async () => {
    const data: any = { "name": "Bruce Wayne Inc", "domains": ["wayne.com"], "account_tier": "Basic" };
    const company = new Company(client);
    let createResult = await company.create(data);
    const result = await company.get(createResult.body.id);
    expect(result.status).to.equal(200);
    expect(result.statusText).to.equal('OK');
    expect(result.body.id).to.equal(createResult.body.id);
    company.delete(result.body.id);
  });

  it("should return an error when fetching non existing company", async () => {
    const company = new Company(client);
    const result = await company.get(912112);
    expect(result.status).to.equal(404);
    expect(result.statusText).to.equal('Not Found');
  });

});