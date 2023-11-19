// This file interacts with any storage-system
// This may modify the storage system after receiving function calls
// from server.js
// or may 

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
