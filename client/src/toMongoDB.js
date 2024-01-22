// const csv = require('csv-parser')
// const fs = require('fs')
// const results = [];
const Papa = require('papaparse')
const axios = require('axios')
// const { putCategory } = require('./api/category')

const baseURL = 'http://localhost:3000';

const PATH_PREFIX = '/category/';

const results = Papa.parse(`
1,Virtual currencies like Bitcoin offer complete anonymity in financial transactions.,True,False,,False,,,,,,,
2,The use of mobile payment platforms eliminates the risk of financial fraud.,True,False,,False,,,,,,,
3,"How does the use of decentralized cryptocurrencies impact traditional payment methods?
",Disrupts existing financial systems and introduces regulatory challenges,Reduces the risk of fraud and identity theft,Enhances the speed and efficiency of transactions,A,,,,,,,
4,"What is one potential disadvantage of using mobile payment platforms for consumer spending?

",Increased vulnerability to data breaches and hacking,Limited acceptance in large establishments,Higher transaction fees compared to other payment methods,A,,,,,,,
5,"How does the use of installment payment options, such as ""buy now, pay later"" services, impact consumer spending habits?

",Increases the likelihood of overspending and impulse purchases,Provides flexibility in managing payments and budgeting,Encourages responsible budgeting and financial planning,A,,,,,,,
6,"What is one potential risk associated with using virtual wallets for contactless payments?

",Exposure to potential data breaches and unauthorized access,Limited acceptance among merchants and businesses,Higher transaction fees compared to traditional payment methods,A,,,,,,,
7,"How do chargebacks offered by credit card companies impact consumer spending behavior?
",Encourage responsible spending and provide additional buyer protection,Lead to increased transaction disputes and delays,Result in higher interest rates and fees for credit card usage,A,,,,,,,
8,"What is one potential drawback of using digital currencies for online transactions?

",Increased susceptibility to market volatility and price fluctuations,"Offers better privacy and anonymity in financial transactions
",Provides faster and more efficient cross-border transactions,A,,,,,,,
9,"How does the use of contactless payment methods impact consumer spending habits?
","Increases speed and convenience of making purchases, thus increasing the likelihood of impulse purchases and overspending ",Reduces transaction fees and overall costs associated with purchases,Encourages more mindful and intentional spending,A,,,,,,,
10,"What is one potential risk associated with using prepaid cards for consumer spending?

",Limited acceptance among merchants and businesses,Higher interest rates and fees compared to other payment methods,Increased vulnerability to identity theft and fraudulent transactions,A,,,,,,,
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
        obj.category = 'Payment Methods' // CHANGE
        // obj.difficulty = 'Beginner' // CHANGE
        // obj.difficulty = 'Waystage' // CHANGE
        obj.difficulty = 'Advanced' // CHANGE
        obj.name = results.data[i][1]
        obj.answers = []
        for (let j = 2; j < 5; j++) {
            if (results.data[i][j] != '') {
                obj.answers.push(results.data[i][j])
            }
        }
        if (results.data[i][5] == '1' || results.data[i][5] == 'A' || results.data[i][5] == 'True' || results.data[i][5] == "YES") {
            obj.correct = results.data[i][2]
        } else if (results.data[i][5] == '0' || results.data[i][5] == "NO" || results.data[i][5] == "False") {
            obj.correct = results.data[i][3]
        }
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