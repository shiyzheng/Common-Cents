// This file interacts with the storage-system containing website content
// This may modify the storage system or may get data from storage system after
// receiving function calls from server.js

export {
  testExport, 
  getLessons,
  getAllStoredTopics,
}

function getAllStoredTopics() {
  return [];
}

function testExport() {
  console.log('function exported');
}

function getLessons() {
  return ['Lesson1', 'Lesson2', 'Lesson3'];
}
