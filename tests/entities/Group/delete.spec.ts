const expect = require('chai').expect;
import Group from '../../../src/entities/Group';
import HttpClient from '../../../src/client/httpClient';
const config = require('config');

describe("Group Api: delete", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should delete a group entity with given id and result should be 204", async () => {
    const data = { "name": "Api Delete Sample Group", "description": "Api Sample Group description", "group_type": "support_agent_group", "auto_ticket_assign": false };
    const group = new Group(client);
    let result = await group.create(data);
    expect(result.status).to.equal(201);
    expect(result.statusText).to.equal('Created');
    result = await group.delete(result.body.id);
    expect(result.status).to.equal(204);
  });
});