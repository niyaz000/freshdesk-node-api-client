const expect = require('chai').expect;
const should = require('chai').should();

import Company from '../../../src/entities/Company';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("Company Api: delete", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should delete company and result should be 204", async () => {
    const data: any = { "name": "Bruce Wayne Inc", "domains": ["wayne.com"], "account_tier": "Basic" };
    const company = new Company(client);
    let result = await company.create(data);
    const id = result.body.id;
    expect(result.status).to.equal(201);
    expect(result.statusText).to.equal('Created');
    should.exist(result.body);
    result = await company.delete(id);
    expect(result.status).to.equal(204);
    result = await company.get(id);
    expect(result.status).to.equal(404);
    expect(result.statusText).to.equal('Not Found');
  });

});