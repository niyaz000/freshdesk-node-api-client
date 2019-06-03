const expect = require('chai').expect;
import Group from '../../../src/entities/Group';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("Group Api: create", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should create a group entity with and result should be 201", async () => {
    const data = { "name": "create Api Sample Group", "description": "Api Sample Group description", "group_type": "support_agent_group", "auto_ticket_assign": false };
    const group = new Group(client);
    let result = await group.create(data);
    expect(result.status).to.equal(201);
    expect(result.statusText).to.equal('Created');
    result = await group.delete(result.body.id);
  });
});