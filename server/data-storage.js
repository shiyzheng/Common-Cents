// This file interacts with the storage-system containing website content
// This may modify the storage system or may get data from storage system after
// receiving function calls from server.js

import fsp from 'fs/promises'

import {
  MongoClient,
  ServerApiVersion,
} from 'mongodb'

const uri = "mongodb+srv://xianhanc:Bhz8QFdkNagqhgMm@cluster0.3uugri4.mongodb.net/?retryWrites=true&w=majority";

// import lockFile from 'lockfile'

export {
  getAllStoredTopics,
  storeTopic,
  deleteTopic,
  getAllQuestionsForTopic,
  getQuestionGivenTopic,
  storeQuestionGivenTopic,
  deleteQuestionGivenTopic,

  testMongoDb,
}

// define const variables such as file paths here
const PATH_TO_TOPICS = 'storage/content/topics';
const QUESTIONS_RELATIVE_PATH_FROM_TOPIC = '/questions';
const FORWARD_SLASH = '/';


async function getAllStoredTopics() {
  try {
    let storedTopics = await fsp.readdir(PATH_TO_TOPICS);
    return storedTopics;
  } catch (err) {
    console.error('error:::', err);
  }
}

function buildPathToTopic(topic) {
  return PATH_TO_TOPICS + FORWARD_SLASH + topic;
}

async function storeTopic(topic) {
  try {
    const pathToTopic = buildPathToTopic(topic);
    fsp.mkdir(pathToTopic);
  } catch (err) {
    console.error('error when making directory for storing topic', err);
  }
}

async function deleteTopic(topic) {
try {
    fsp.rmdir(PATH_TO_TOPICS + FORWARD_SLASH + topic);
  } catch (err) {
    console.error('error when deleting directory of stored topic', err);
  }
}

// returns a list of objects, where each object is a question for the given topic
async function getAllQuestionsForTopic(topic) {
  try {
    const questionFileNames = await fsp.readdir(PATH_TO_TOPICS + FORWARD_SLASH
        + topic + QUESTIONS_RELATIVE_PATH_FROM_TOPIC);
    return questionFileNames;
  } catch (error) {
    console.error('error when getting all questions of a topic', error);
  }
}

async function getQuestionGivenTopic(topic, question) {
  try { 
    const questionPath = buildQuestionPath(topic, question); 
    const questionString = await fsp.readFile(questionPath, 'utf8');
    const questionJson = JSON.parse(questionString);
    return questionJson;
  } catch (err) {
    console.error('error when getting one question of a topic', err);
  }
}

function buildQuestionPath(topic, questionFileName) {
  return PATH_TO_TOPICS + FORWARD_SLASH + topic
    + QUESTIONS_RELATIVE_PATH_FROM_TOPIC + FORWARD_SLASH + questionFileName;
}

async function storeQuestionGivenTopic(topic, questionFileName, questionJson) {
  try {
    const questionPath = buildQuestionPath(topic, questionFileName);
    fsp.writeFile(questionPath, JSON.stringify(questionJson, null, 4), 'utf-8');
  } catch (err) {
    console.error('error when writing file for storing question json', err);
  }
}

async function deleteQuestionGivenTopic(topic, questionFileName) {
  try {
    const questionPath = buildQuestionPath(topic, questionFileName);
    await fsp.unlink(questionPath);
  } catch (err) {
    console.error('error when deleting file of given topic', err);
  }
}

async function testMongoDb() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  })
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    const myDB = client.db('Cluster0');
    const query = { "username": "testing" };
    const myColl = myDB.collection("users");
    const cursor = myColl.find(query);
    console.log("testing doc");
    for await (const doc of cursor) {
      console.dir(doc);
    }
    console.log("Pinged your deployment. You have successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
  console.log("test mongo db");
}
