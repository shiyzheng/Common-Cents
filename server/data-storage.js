// This file interacts with the storage-system containing website content
// This may modify the storage system or may get data from storage system after
// receiving function calls from server.js

import fs from 'fs'

export {
  testExport, 
  getLessons,
  getAllStoredTopics,
}


function getAllStoredTopics() {
  console.log("getAllStoredTopics invoked");
  fs.readdir('storage/content/topics', (err, files) => {
    if (err) {
      console.log(err);
    } else {
      console.log("\nCurrent directory file names:");
      files.forEach(file => {
        console.log(file);
      })
    }
  });
  console.log("get all stored topics reached");
  return [];
}

function testExport() {
  console.log('function exported');
}

function getLessons() {
  return ['Lesson1', 'Lesson2', 'Lesson3'];
}
