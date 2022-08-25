require('dotenv').config();

module.exports = {
  syncLabels: process.env.SYNC_LABELS ? process.env.SYNC_LABELS.split(',') : [],
  notionPat: process.env.NOTION_PAT,
  notionCreateStatus: process.env.NOTION_CREATE_STATUS,
  notionCloseStatus: process.env.NOTION_CLOSE_STATUS,
  notionDatabaseId: process.env.NOTION_DATABASE_ID,
};
