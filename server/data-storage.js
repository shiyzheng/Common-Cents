// This file interacts with the storage-system containing website content
// This may modify the storage system or may get data from storage system after
// receiving function calls from server.js

import fsp from 'fs/promises'

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
    let storedTopics = await fsp.readdir(PATH_TO_TOPICS);
    return storedTopics;
  } catch (err) {
    console.error('error:::', err);
  }
}

async function storeTopic(topic) {
  try {
    fsp.mkdir(PATH_TO_TOPICS + FORWARD_SLASH + topic);
  } catch (err) {
    console.log('error when making directory for storing topic', err);
  }
}

async function deleteTopic(topic) {
try {
    fsp.rmdir(PATH_TO_TOPICS + FORWARD_SLASH + topic);
  } catch (err) {
    console.log('error when deleting directory of stored topic', err);
  }
}
