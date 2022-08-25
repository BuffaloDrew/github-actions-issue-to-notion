const { close, create, destroy } = require('../src/client');

const EXTERNAL_ID = 100;

const BODY = {
  title: 'Sample Issue',
  description: 'This is a sample issue',
  number: 1,
  githubOptions: {
    issueUrl: 'https://test.com/issues/1',
  },
};

describe('client', () => {
  it('should create a notion issue', async () => {
    const result = await create(EXTERNAL_ID, BODY);
    expect(result.id).toBeDefined();
  });

  it('should archive a notion card', async () => {
    const result = await destroy(EXTERNAL_ID);
    expect(result.archived).toBe(true);
  });

  it('should close a notion card', async () => {
    const result = await close(EXTERNAL_ID);
    console.log(result);
  });
});
