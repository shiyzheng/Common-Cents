// const csv = require('csv-parser')
// const fs = require('fs')
// const results = [];
const Papa = require('papaparse')
const axios = require('axios')
// const { putCategory } = require('./api/category')

const baseURL = 'http://localhost:3000';

const PATH_PREFIX = '/category/';

const results = Papa.parse(`
1,The capabilities of an HSA were broadened recently under the...,CARES act,Economic relief programs associated with the 2008 financial crisis,Affordable Care Act (Obamacare),A
2,"Is it still possible to cover a spouse or dependent's medical expenses with your HSA, even if your HSA-eligible plan does not cover them?","Yes, qualified distributions can count necessary medical expenses for your spouse or dependents","No, if no one else is listed as an HSA joint owner, the funds can only be used to cover your own medical expenses","No, but the funds may be still be used as long as a 20% tax penalty for regular early withdrawal is paid",A
3,"Can HSA balances be transferred to other accounts, similar to how IRA balances can?","Yes, in a process called consolidation to other HSAs, which may or may not be subject to taxation","No, HSA balances cannot be transferred without incurring a 20% penalty for early withdrawal","Yes, as long as it is proven that the funds transferred will be used for medical expenses within three years",A
4,Do pre-existing conditions affect eligibility for an HSA?,No,Yes,"No, but pre-existing conditions may affect your qualification for a high-deductible health plan",A
5,An antiquiated form of tax-advantaged health savings accounts was:,Archer Medical Savings Accounts (MSAs),High-deductible Health Spending Accounts (HDHSA),Medical Individual Retirement Accounts (MIRA),A
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
        obj.unit = 'Credit Sources' // CHANGE

        obj.difficulty = 'Beginner' // CHANGE
        // obj.difficulty = 'Waystage' // CHANGE
        // obj.difficulty = 'Advanced' // CHANGE

        obj.lesson = 'Managing Credit' // CHANGE

        obj.id = 0

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