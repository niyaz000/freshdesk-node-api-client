const expect = require('chai').expect;
import Group from '../../../src/entities/Group';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("Group Api: listAll", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should listAll group entities and result should be 200", async () => {
    const group = new Group(client);
    let result = await group.listAll();
    expect(result.status).to.equal(200);
    expect(result.body.length > 0).to.equal(true);
    expect(Array.isArray(result.body)).to.equal(true);
  });
});