const assert = require('assert');
const app = require('../../src/app');

describe('\'cookbooks\' service', () => {
  it('registered the service', () => {
    const service = app.service('cookbooks');

    assert.ok(service, 'Registered the service');
  });
});
