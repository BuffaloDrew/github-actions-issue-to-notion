const core = require('@actions/core');
const github = require('@actions/github');
const { run } = require('./src/sync');

run(github.context.payload)
  .then((notionPage) => {
    core.setOutput(`id`, `${notionPage?.id}`);
  })
  .catch((error) => {
    console.log(error);
    core.setFailed(error);
  });
