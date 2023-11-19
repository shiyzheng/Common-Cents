// This file interacts with the storage-system containing website content
// This may modify the storage system or may get data from storage system after
// receiving function calls from server.js

import fs from 'fs/promises'

export {
  testExport, 
  getLessons,
  getAllStoredTopics,
}

// define const variables such as file paths here
const PATH_TO_TOPICS = 'storage/content/topics';


async function getAllStoredTopics() {
  try {
    let storedTopics = await fs.readdir(PATH_TO_TOPICS);
    console.log("withing data-storage:::", storedTopics)
    return storedTopics;
  } catch (err) {
    console.error('error:::', err);
  }
  // fs.readdir('storage/content/topics', (err, files) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     files.forEach(fileName => {
  //       storedTopics.push(fileName);
  //     })
  //     console.log("within function:" + storedTopics)
  //     return storedTopics;
  //   }
  // });
}

function testExport() {
  console.log('function exported');
}

function getLessons() {
  return ['Lesson1', 'Lesson2', 'Lesson3'];
}
