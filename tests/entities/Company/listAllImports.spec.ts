const expect = require('chai').expect;

import Company from '../../../src/entities/Company';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("Company Api: listAllImports", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should listAll imports and result should be 200", async () => {
    const company = new Company(client);
    let result = await company.listAllImports();
    expect(result.status).to.equal(200);
    expect(result.statusText).to.equal('OK');
  });

  it("should listAll imports with given status and result should be 200", async () => {
    const company = new Company(client);
    let result = await company.listAllImports("completed");
    expect(result.status).to.equal(200);
    expect(result.statusText).to.equal('OK');
  });

});