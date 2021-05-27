
const statsModel = require('./../IR-models/statistical-model')
const queryPreProcessing = require('./../utils/queryPreProcessing')
const documentGenerator = require('./../utils/documentsGenerator')



//controller
exports.statsModelController = (req, res) => {
    let query = queryPreProcessing(req.body.queryInput)
    const results = statsModel.statsModel(query)
    const rankedDocs = statsModel.rankDocs(results.document)
    console.log(rankedDocs);
    res.render(`${__dirname}/../public/stats-ret`, { data: results, docs: rankedDocs })
}