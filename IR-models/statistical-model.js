const sortArray = require('sort-array')
const dataHandler = require('../utils/dataHandler')
const allowedChars = require('../utils/allowedChars')




exports.statsModel = (query) => {
    let letterWeights = calcLetterWeights(query)
    let outputJSON = { letterWeights }
    outputJSON.letters = allowedChars
    let documentJSON = []
    for (let i = 1; i <= 10; i++) {
        let docData = {}
        let handledDoc = dataHandler.documentHandler(`${__dirname}/../documents/d${i}.txt`)
        let freqs = lettersFreq(handledDoc)
        // console.log(freqs);
        let lettersWeight = lettersFreqWeight(letterWeights, freqs)
        docData.docName = (`d${i}.txt`)
        docData.lettersFrequency = freqs
        docData.similarity = calcSimilarity(lettersWeight)
        documentJSON.push(docData)
    }
    outputJSON.document = documentJSON
    return outputJSON;
}
exports.rankDocs = (resultsDocs) => {

    sortArray(resultsDocs, {
        by: 'similarity',
        order: 'desc'
    })

    return resultsDocs
}



const calcSimilarity = (letters) => {
    let similarity = 0
    letters.map((el) => {
        similarity += el.weight * el.frequency
    })
    return similarity
}



//return letter frequency in each document and the query letter weight
const lettersFreqWeight = (weights, lettersFreq) => {
    let letters = lettersFreq


    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i].letter
        const weight = weights[letter]
        letters[i].weight = weight
    }
    return letters

}

//return each letter frequency in a document
const lettersFreq = (handledDoc) => {
    let lettersFreq = []
    for (let i = 0; i <= 5; i++) {
        let letterData = {}
        letterData.letter = allowedChars[i]
        letterData.frequency = dataHandler.calcLetterFreq(handledDoc, allowedChars[i]);
        lettersFreq.push(letterData)
    }

    return lettersFreq
}

//tf*IDF
// query is a document
const calcLetterWeights = (query) => {


    return weights
}




let query = { a: 0.3, c: 0.8 }
// let res = this.statsModel(query)
// console.log(res);


// console.log(this.rankDocs(res.document))
