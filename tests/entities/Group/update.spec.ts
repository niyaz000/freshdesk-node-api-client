const expect = require('chai').expect;
import Group from '../../../src/entities/Group';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("Group Api: update", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should update a group entity and result should be 200", async () => {
    const data = { "name": "update Another Sample Group", "description": "update api description", "group_type": "support_agent_group", "auto_ticket_assign": false };
    const group = new Group(client);
    let result = await group.create(data);
    expect(result.status).to.equal(201);
    expect(result.statusText).to.equal('Created');
    const id = result.body.id;
    result = await group.update(id, { "description": "update api new description" });
    expect(result.status).to.equal(200);
    expect(result.statusText).to.equal('OK');
    expect(result.body.description).to.equal('update api new description');
    result = await group.delete(id);
  });
});