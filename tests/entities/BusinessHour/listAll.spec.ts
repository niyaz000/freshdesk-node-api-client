
const expect = require('chai').expect;
import BusinessHour from '../../../src/entities/BusinessHour';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("BusinessHour Entity", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should list all BusinessHour", async () => {
    const businessHour = new BusinessHour(client);
    const result = await businessHour.listAll();
    expect(result.status).to.equal(200);
    expect(result.statusText).to.equal('OK');
    expect(result.body[0].id).to.equal(65673);
  });

});