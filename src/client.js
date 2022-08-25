const {
  notionPat,
  notionCreateStatus,
  notionDatabaseId,
  notionCloseStatus,
} = require('./config');
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: notionPat });

async function findByExternalId(externalId) {
  const response = await notion.databases.query({
    database_id: notionDatabaseId,
    filter: {
      and: [
        {
          property: 'Github Issue Number',
          number: {
            equals: externalId,
          },
        },
      ],
    },
  });

  if (response.results.length > 1) {
    throw new Error(`Multiple results found for externalId ${externalId}`);
  }

  return response.results[0] || null;
}

async function destroy(externalId) {
  const page = await findByExternalId(externalId);
  let response;

  if (page?.id) {
    response = await notion.pages.update({
      page_id: page.id,
      archived: true,
    });
  }
  return response;
}

async function close(externalId) {
  const page = await findByExternalId(externalId);
  let response;

  if (page?.id) {
    response = await notion.pages.update({
      page_id: page.id,
      properties: {
        Status: {
          select: { name: notionCloseStatus },
        },
      },
    });
  }
  return response;
}

async function create(externalId, body) {
  //todo rich text
  const { title, description, githubOptions } = body;

  return await notion.pages.create({
    parent: { database_id: notionDatabaseId },
    properties: {
      Name: {
        title: [{ type: 'text', text: { content: title } }],
      },
      Status: {
        select: { name: notionCreateStatus },
      },
      'Github Issue Number': {
        number: externalId,
      },
      'Github Issue Url': {
        url: githubOptions.issueUrl,
      },
    },
    children: [
      {
        type: 'page',
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: description,
              },
            },
          ],
        },
      },
    ],
  });
}

module.exports = {
  close,
  create,
  destroy,
  findByExternalId,
};
