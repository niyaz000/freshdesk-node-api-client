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

  it("should fetch a BusinessHour entity with given id and result should be 200", async () => {
    const businessHour = new BusinessHour(client);
    const result = await businessHour.get(65673);
    expect(result.status).to.equal(200);
    expect(result.statusText).to.equal('OK');
    expect(result.body.id).to.equal(65673);
  });

  it("should return an error when fetching non existing BusinessHour", async () => {
    const businessHour = new BusinessHour(client);
    const result = await businessHour.get(1);
    expect(result.status).to.equal(404);
    expect(result.statusText).to.equal('Not Found');
  });

});