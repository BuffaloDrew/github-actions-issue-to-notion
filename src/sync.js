const { create, close } = require('./client');
const map = require('./payload_mapper');
const { syncLabels } = require('./config');
const ACTIONS = require('./actions');

const run = async (githubPayload) => {
  const mappedPayload = map(githubPayload);

  const { action, externalId, issueLabels } = mappedPayload;

  const shouldNotSync = issueLabels.some((label) => {
    syncLabels.includes(label);
  });

  if (shouldNotSync) {
    console.log(`Skipping ${action} for issue ${externalId}`);
    return null;
  }

  let item = null;

  switch (action) {
    case ACTIONS.OPENED:
      item = await create(externalId, mappedPayload);
      break;
    case ACTIONS.CLOSED:
      item = await close(externalId, mappedPayload);
      break;
    default:
      console.log(`unhandled action: ${action}`);
  }

  return item;
};

module.exports = { run };
