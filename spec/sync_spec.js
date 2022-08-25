const { run } = require('../src/sync');
const { destroy, findByExternalId } = require('../src/client');
const {
  OPENED,
  CLOSED,
  TEST_EXTERNAL_ID,
} = require('./github_action_test_payloads');

describe('sync', () => {
  describe('create', () => {
    afterEach(async () => {
      await destroy(TEST_EXTERNAL_ID);
    });
    it('creates a notion page', async () => {
      const notionPage = await run(OPENED);
      expect(notionPage.id).toBeDefined();
    });
  });

  describe('close', () => {
    beforeEach(async () => {
      await run(OPENED);
    });
    afterEach(async () => {
      //await destroy(TEST_EXTERNAL_ID);
    });
    it('closes a notion page', async () => {
      const oldStatus = (await findByExternalId(TEST_EXTERNAL_ID)).properties
        .Status.id;
      const newStatus = (await run(CLOSED)).properties.Status.id;
      expect(newStatus).not.toBe(oldStatus);
    });
  });
});
