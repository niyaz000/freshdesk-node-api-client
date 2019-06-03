const expect = require('chai').expect;

import Company from '../../../src/entities/Company';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("Company Api: listAll", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should listAll companies and result should be 200", async () => {
    const company = new Company(client);
    let result = await company.listAll();
    expect(result.status).to.equal(200);
    expect(result.statusText).to.equal('OK');
    expect(Array.isArray(result.body)).to.equal(true);
  });

  it("should listAll with given page number and page size and result should be 200", async () => {
    const company = new Company(client);
    let result = await company.listAllWithPagination(1, 2);
    expect(result.status).to.equal(200);
    expect(result.statusText).to.equal('OK');
    expect(Array.isArray(result.body)).to.equal(true);
    expect(result.body.length).to.equal(2);
  });

});