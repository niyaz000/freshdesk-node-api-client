const expect = require('chai').expect;
import HttpClient from '../../../src/client/httpClient';
import SlaPolicy from '../../../src/entities/SlaPolicy';
const config = require('config');

describe("SlaPolicy update Api", () => {
  let client: HttpClient;
  before(() => {
    client
      = new HttpClient(config.get('credentials.domainName'), config.get('credentials.apiKey'));
  });

  it("should update a slapolicy and result should be 200", async () => {
    const data = { "name": "SLA3", "description": "Sample SLA Description", "active": true, "sla_target": { "priority_4": { "respond_within": 900, "resolve_within": 1296000, "business_hours": true, "escalation_enabled": true }, "priority_3": { "respond_within": 900, "resolve_within": 1296000, "business_hours": true, "escalation_enabled": true }, "priority_2": { "respond_within": 900, "resolve_within": 1296000, "business_hours": true, "escalation_enabled": true }, "priority_1": { "respond_within": 900, "resolve_within": 1296000, "business_hours": true, "escalation_enabled": true } }, "applicable_to": { "group_ids": [908968] }, "escalation": { "response": {}, "resolution": {} } };
    const sla = new SlaPolicy(client);
    let result = await sla.create(data);
    result = await sla.update({ applicable_to: { group_ids: [887144] } }, result.body.id);
    expect(result.status).to.equal(200);
  });
});