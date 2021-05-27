

// let queryStr = '"a":0.8,"b":0.9'
module.exports = queryPreProcessing = (queryStr) => {
    queryStr = `{${queryStr}}`
    return queryHandler(queryStr)
}





const queryHandler = (queryInputStr) => {
    try {
        return JSON.parse(queryInputStr)
    }
    catch (err) {
        return console.log(`${err}, Please write your query in JSON format`);
    }

}



