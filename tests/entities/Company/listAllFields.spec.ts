const expect = require('chai').expect;

import Company from '../../../src/entities/Company';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("Company Api: listAllFields", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should listAll companies_fields and result should be 200", async () => {
    const company = new Company(client);
    let result = await company.listAllFields();
    expect(result.status).to.equal(200);
    expect(result.statusText).to.equal('OK');
    expect(Array.isArray(result.body)).to.equal(true);
    expect(result.body.length > 0).to.equal(true);
  });

});