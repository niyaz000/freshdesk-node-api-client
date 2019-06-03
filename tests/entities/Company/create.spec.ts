const expect = require('chai').expect;
const should = require('chai').should();

import Company from '../../../src/entities/Company';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("Company Api: create", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should create a company entity from given data and result should be 201", async () => {
    const data: any = { "name": "Bruce Wayne Inc", "domains": ["wayne.com"], "account_tier": "Basic" };
    const company = new Company(client);
    const result = await company.create(data);
    expect(result.status).to.equal(201);
    expect(result.statusText).to.equal('Created');
    should.exist(result.body.id);
    expect(result.body.name).to.equal('Bruce Wayne Inc');
    company.delete(result.body.id);
  });

  it("should return an error when the input data is invalid", async () => {
    const data: any = { "id": 820071, "name": "Bruce Wayne Inc", "domains": ["wayne.com"], "account_tier": "Basic" };
    const company = new Company(client);
    const result = await company.create(data);
    expect(result.status).to.equal(400);
    expect(result.statusText).to.equal('Bad Request');
  });

});