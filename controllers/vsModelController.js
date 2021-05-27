
const vectorModel = require('./../IR-models/vector-model')
const queryPreProcessing = require('./../utils/queryPreProcessing')
const dataHandler = require('./../utils/dataHandler')



//controller
exports.vectorModelController = (req, res) => {
    let query = dataHandler.vsQueryHandler(req.body.queryInput)
    const vsOutput = vectorModel.vsModel(query)
    const results = vectorModel.computeDocsSimilarities(vsOutput)
    const rankedDocs = vectorModel.rankDocs(results)
    console.log(rankedDocs);
    res.render(`${__dirname}/../public/vs-ret`, { query: query.docLetters, documents: vsOutput.documents, docs: rankedDocs })
}