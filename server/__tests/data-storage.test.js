import {
    getAllStoredTopics,
    storeTopic,
    deleteTopic,
    getAllQuestionsForTopic,
    getQuestionGivenTopic,
    storeQuestionGivenTopic,
    deleteQuestionGivenTopic,
} from '../data-storage.js'
 
const TEST_ALL_TOPICS1 = ["topic1", "topic2"];

const TEST_STORED_TOPIC1 = "stored-topic1";

const TEST_TOPIC1 = "topic1";
const TEST_ALL_QUESTIONS_FROM_TOPIC1 = ["question1.json", "question2.json"]

const TEST_QUESTION1_TOPIC1 = "question1.json";
const TEST_JSON_QUESTION1_TOPIC1 = {
    "question1": "Question1-Text",
    "answer": ["a11", "a12", "a13", "a14"]
};

const TEST_STORED_QUESTION1_TOPIC1 = "stored-question1.json";
const TEST_STORED_JSON_QUESTION1_TOPIC1 = {
    "stored-question1": "Stored-Question1-Text",
    "answer": ["a11", "a12", "a13", "a14"]
};

await test('test-all-topics1', async () => {
    const allTopics = await getAllStoredTopics();
    TEST_ALL_TOPICS1.forEach((element) => {
        expect(allTopics).toContain(element);
    })
});

// depends on 'test-deleted-stored-topic1' in previous test command
await test('test-stored-non-existent-topic1', async () => {
    const allTopicsBefore = await getAllStoredTopics();
    await expect(allTopicsBefore).not.toContain(TEST_STORED_TOPIC1)
    storeTopic(TEST_STORED_TOPIC1);
    const allTopicsAfter = await getAllStoredTopics();
    await expect(allTopicsAfter).toContain(TEST_STORED_TOPIC1);

});

// depends on 'test-stored-non-existent-topic1' in current test command
await test('test-deleted-stored-topic1', async () => {
    const allTopicsBefore = await getAllStoredTopics();
    await expect(allTopicsBefore).toContain(TEST_STORED_TOPIC1);
    await deleteTopic(TEST_STORED_TOPIC1);
    const allTopicsAfter = await getAllStoredTopics();
    await expect(allTopicsAfter).not.toContain(TEST_STORED_TOPIC1);
});

await test('test-all-questions-from-topic1', async () => {
    const allQuestions = await getAllQuestionsForTopic(TEST_TOPIC1);
    TEST_ALL_QUESTIONS_FROM_TOPIC1.forEach((element) => {
        expect(allQuestions).toContain(element);
    })
});

await test('test-get-question-from-topic1', async () => {
    const question1Json = await
        getQuestionGivenTopic(TEST_TOPIC1, TEST_QUESTION1_TOPIC1);
    expect(question1Json).toEqual(TEST_JSON_QUESTION1_TOPIC1);
});

// depends on 'test-deleted-stored-question1' in previous test command
await test('test-stored-non-existent-question1', async () => {
    const allQuestionsBefore = await getAllQuestionsForTopic(TEST_TOPIC1);
    await expect(allQuestionsBefore).not.toContain(TEST_STORED_QUESTION1_TOPIC1)
    await storeQuestionGivenTopic(TEST_TOPIC1, TEST_STORED_QUESTION1_TOPIC1,
        TEST_STORED_JSON_QUESTION1_TOPIC1)
    const questionJson = await getQuestionGivenTopic(TEST_TOPIC1,
        TEST_STORED_QUESTION1_TOPIC1);
    expect(questionJson).toEqual(TEST_STORED_JSON_QUESTION1_TOPIC1);
    // await expect(allTopicsAfter).toContain(TEST_STORED_TOPIC1);
});

// depends on 'test-stored-non-existent-question1' in current test command
await test('test-deleted-stored-topic1', async () => {
    const allQuestionsBefore = await getAllQuestionsForTopic(TEST_TOPIC1);
    await expect(allQuestionsBefore).toContain(TEST_STORED_QUESTION1_TOPIC1);
    await deleteQuestionGivenTopic(TEST_TOPIC1, TEST_STORED_QUESTION1_TOPIC1);
    const allQuestionsAfter = await getAllQuestionsForTopic(TEST_TOPIC1);
    await expect(allQuestionsAfter).not.toContain(TEST_STORED_TOPIC1);
});