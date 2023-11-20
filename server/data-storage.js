// This file interacts with the storage-system containing website content
// This may modify the storage system or may get data from storage system after
// receiving function calls from server.js

import fsp from 'fs/promises'

import lockFile from 'lockfile'

export {
  getAllStoredTopics,
  storeTopic,
  deleteTopic,
  getAllQuestionsForTopic,
  getQuestionGivenTopic,
  storeQuestionGivenTopic,
  deleteQuestionGivenTopic,
}

// define const variables such as file paths here
const PATH_TO_TOPICS = 'storage/content/topics';
const QUESTIONS_RELATIVE_PATH_FROM_TOPIC = '/questions';
const FORWARD_SLASH = '/';
const dotJson = '.json';


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

// returns a list of objects, where each object is a question for the given topic
async function getAllQuestionsForTopic(topic) {
  try {
    const questionFileNames = await fsp.readdir(PATH_TO_TOPICS
        + FORWARD_SLASH
        + topic
      + QUESTIONS_RELATIVE_PATH_FROM_TOPIC);
    return questionFileNames;
  } catch (error) {
    console.log('error when getting all questions of a topic', error);
  }
}

async function getQuestionGivenTopic(topic, question) {
  try { 
    const questionPath = PATH_TO_TOPICS + FORWARD_SLASH + topic
      + QUESTIONS_RELATIVE_PATH_FROM_TOPIC + FORWARD_SLASH + question;
    const questionString = await fsp.readFile(questionPath, 'utf8');
    const questionJson = JSON.parse(questionString);
    return questionJson;
  } catch (err) {
    console.log('error when getting one question of a topic', err);
  }
}

async function buildQuestionPath(topic, questionFileName) {
  return PATH_TO_TOPICS + FORWARD_SLASH + topic
    + QUESTIONS_RELATIVE_PATH_FROM_TOPIC + FORWARD_SLASH + questionFileName;
}

async function storeQuestionGivenTopic(topic, questionFileName, questionJson) {
  try {
    // const questionPath = PATH_TO_TOPICS + FORWARD_SLASH + topic
    //   + QUESTIONS_RELATIVE_PATH_FROM_TOPIC + FORWARD_SLASH + questionFileName; 
    const questionPath = await buildQuestionPath(topic, questionFileName);
    fsp.writeFile(questionPath, JSON.stringify(questionJson, null, 4), 'utf-8');
  } catch (err) {
    console.log('error when writing file for storing question json', err);
  }
}

async function deleteQuestionGivenTopic(topic, questionFileName) {
  try {
    const questionPath = await buildQuestionPath(topic, questionFileName);
    console.log("DELETED QUESTION PATH:::", questionPath);
    await fsp.unlink(questionPath);
  } catch (err) {
    console.log('error when deleting file of given topic', err);
  }
}
