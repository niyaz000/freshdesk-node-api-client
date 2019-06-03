const expect = require('chai').expect;

import Company from '../../../src/entities/Company';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("Company Api: update", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should update a company entity and result should be 200", async () => {
    const data: any = { "name": "Bruce Wayne Inc", "domains": ["wayne.com"], "account_tier": "Basic" };
    const company = new Company(client);
    let result = await company.create(data);
    expect(result.status).to.equal(201);
    expect(result.statusText).to.equal('Created');
    data.account_tier = "Premium";
    result = await company.update(result.body.id, data);
    expect(result.body.account_tier).to.equal('Premium');
    company.delete(result.body.id);
  });

});