const computCosineSimilarity = require('compute-cosine-similarity')
const sortArray = require('sort-array')

const dataHandler = require('./../utils/dataHandler')
const allowedChars = require('../utils/allowedChars')


// const calcLetterWeights = (query) => {
//     let weights = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 }
//     for (const key in query) {

//         if (Object.hasOwnProperty.call(query, key)) {
//             const element = query[key];
//             weights[key] = element

//             // console.log(key, element); 
//         }
//     }

//     return weights
// }


//query is a document

exports.vsModel = (query) => {

    const queryWeights = calcDocWeights(query)
    let outputJSON = { queryWeights }
    let documentsArr = []
    for (let i = 1; i <= 10; i++) {
        let docData = {}
        docData.docName = (`d${i}.txt`)
        let handledDoc = dataHandler.documentHandler(`${__dirname}/../documents/d${i}.txt`)
        const documentWeights = calcDocWeights(handledDoc)
        docData.weights = documentWeights

        documentsArr.push(docData)
    }
    outputJSON.documents = documentsArr
    console.log(outputJSON);
    return outputJSON;
}

exports.computeDocsSimilarities = (vsModelObj) => {
    let output = []
    let queryWeights = handleWeightsObj(vsModelObj.queryWeights)
    for (let i = 1; i <= 10; i++) {
        let document = {}
        document.name = `d${i}.txt`
        let weights = handleWeightsObj(vsModelObj.documents[i - 1].weights)
        document.similarity = computCosineSimilarity(queryWeights, weights)
        output.push(document)
    }
    return output
}

exports.rankDocs = (resultsDocs) => {

    sortArray(resultsDocs, {
        by: 'similarity',
        order: 'desc'
    })

    return resultsDocs
}

const calcQueryWeight = (query) => {

}

const calcDocWeights = (doc) => {
    let weights = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 }
    for (let i = 0; i <= 5; i++) {
        const term = allowedChars[i]
        const tf = dataHandler.calculateTF(term, doc)
        const idf = dataHandler.calculateTermIDFI(term)
        const weight = tf * idf
        weights[term] = weight
    }
    //console.log(weights);
    return weights
}

const handleWeightsObj = (weightsObj) => {
    let weightsArr = []
    for (let i = 0; i <= 5; i++) {
        const term = allowedChars[i]
        weightsArr.push(weightsObj[term])
    }
    return weightsArr
}

// let doc = dataHandler.documentHandler(`${__dirname}/../documents/d1.txt`)
// let weights = calcDocWeights(doc)
// let query = { a: 0.3, c: 0.8 }

// let weights = calcLetterWeights(query)
// console.log(handleWeightsObj(weights));


// let out = this.vsModel(query)
// console.log(out.documents)
// console.log(this.rankDocs(this.computeDocsSimilarities(out)));