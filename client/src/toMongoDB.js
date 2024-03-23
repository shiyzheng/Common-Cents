// const csv = require('csv-parser')
// const fs = require('fs')
// const results = [];
const Papa = require('papaparse')
const axios = require('axios')
// const { putCategory } = require('./api/category')

const baseURL = 'http://localhost:3000';

const PATH_PREFIX = '/category/';

const results = Papa.parse(`
1,A secured credit card requires a __________ to be deposited as collateral.,Security Deposit,Initial Deposit,Collateral Deposit,A
2,The practice of using multiple credit cards and balances to manage debt is called __________.,Debt Consolidation,Debt Snowball,Credit Card Churning,A
3,"What does the term ""interchange rate"" refer to in credit card processing quotes?",The wholesale cost that banks charge processors for credit card transactions.,The percentage of customers who use credit cards for payments.,The fee charged by the credit card company for processing transactions.,A
4,"What does ""PCI compliance"" signify in credit card processing quotes?",The encryption of credit card data to protect against fraud.,The processor's rating for customer satisfaction.,The processor's ability to handle international credit card transactions.,A
5,True/False: PCI compliance ensures that the credit card processor has a high customer satisfaction rating.,TRUE,FALSE,,FALSE
6,True/False: AVS (Address Verification System) is used to verify the accuracy of the billing address provided during a credit card transaction.,TRUE,FALSE,,TRUE
7,"True/False: ""No monthly statement fee"" means that credit card processors never charge a fee for providing monthly transaction reports.",TRUE,FALSE,,FALSE
8,"True/False: PCI compliance is a requirement set by the government that mandates credit card processors to charge a specific fee for security purposes.",TRUE,FALSE,,FALSE
9,"True/False: ""Interchange differential fee"" is a surcharge imposed by credit card processors on specific types of transactions, such as international or high-risk sales.",TRUE,FALSE,,FALSE
10,"True/False: ""Batch settlement fee"" is a charge imposed on merchants for combining multiple transactions into one batch for processing.",TRUE,FALSE,,FALSE
`)

const putCategory = async (category) => {
    try {
        await axios.put(`${baseURL}${PATH_PREFIX}add`, category) 
    } catch (error) {
        console.error("axios function call error:", error);
    }
}

const toMongo = async (results) => {
    for (let i = 0; i < results.data.length; i++) {
        if (results.data[i][1] == null) {
            continue
        }
        const obj = {}
        obj.unit = 'Credit Cards 2' // CHANGE

        // obj.difficulty = 'Beginner' // CHANGE
        // obj.difficulty = 'Waystage' // CHANGE
        obj.difficulty = 'Advanced' // CHANGE

        obj.lesson = 'Managing Credit' // CHANGE

        obj.id = 10

        obj.study_guide = 
``

        obj.name = results.data[i][1]
        obj.answers = []
        for (let j = 2; j < 5; j++) {
            if (results.data[i][j] != '') {
                obj.answers.push(results.data[i][j])
            }
        }
        if (results.data[i][5] == '1' || results.data[i][5] == 'A' || results.data[i][5] == 'a' || results.data[i][5] == "YES") {
            obj.correct = results.data[i][2]
        } else if (results.data[i][5] == 'TRUE') {
            obj.correct = "TRUE"
        } else if (results.data[i][5] == '0' || results.data[i][5] == "NO") {
            obj.correct = results.data[i][3]
        } else if (results.data[i][5] == "FALSE") {
            obj.correct = "FALSE"
        }
        // obj.correct = results.data[i][2]
        await putCategory(obj)
    }
};

toMongo(results)

// fs.createReadStream('questions.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     console.log(results)
//   });