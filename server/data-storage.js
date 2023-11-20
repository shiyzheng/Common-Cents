// This file interacts with the storage-system containing website content
// This may modify the storage system or may get data from storage system after
// receiving function calls from server.js

import fs from 'fs/promises'

export {
  getAllStoredTopics,
  storeTopic,
  deleteTopic,
}

// define const variables such as file paths here
const PATH_TO_TOPICS = 'storage/content/topics';
const FORWARD_SLASH = '/';


async function getAllStoredTopics() {
  try {
    let storedTopics = await fs.readdir(PATH_TO_TOPICS);
    return storedTopics;
  } catch (err) {
    console.error('error:::', err);
  }
}

async function storeTopic(topic) {
  console.log(PATH_TO_TOPICS + FORWARD_SLASH + topic)
}

async function deleteTopic(topic) {
  console.log("DELETE:::", PATH_TO_TOPICS + FORWARD_SLASH + topic);
}
