const expect = require('chai').expect;
import Group from '../../../src/entities/Group';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("Group Api: get", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should fetch a group entity with given id and result should be 200", async () => {
    const data = { "name": "Test Sample Group", "description": "Api Sample Group description", "group_type": "support_agent_group", "auto_ticket_assign": false };
    const group = new Group(client);
    let result = await group.create(data);
    const id = result.body.id;
    result = await group.get(id);
    expect(result.status).to.equal(200);
    expect(result.statusText).to.equal('OK');
    expect(result.body.name).to.equal("Test Sample Group");
    await group.delete(id);
  });

  it("should return an error when fetching non existing group", async () => {
    const group = new Group(client);
    const result = await group.get(1);
    expect(result.status).to.equal(404);
    expect(result.statusText).to.equal('Not Found');
  });

});