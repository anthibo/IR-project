const fs = require('fs')
const Terms = require('./allowedChars')


//query handler
//'a':0.8, 'b':0.3 => {1:{letter:'a', weight:0.8}, 2:{letter:'b', weight:0.3}}
// constraints: input must be a letter between a and f (a-f) 

// func for document reading and preprocessing and return the document letters in an array of string and letters length
exports.documentHandler = (docPath) => {
    let docLetters = fs.readFileSync(docPath, 'utf-8')
    let docLength = docLetters.replace(/\s/g, "").length
    return { docLetters, docLength }

}
exports.vsQueryHandler = (query) => {
    let docLetters = query
    let docLength = query.replace(/\s/g, "").length
    return { docLetters, docLength }
}

// func for calculating the frequency of a letterexports.
exports.calcLetterFreq = (doc, letter) => {
    let letterCounter = 0
    doc.docLetters.split('').map((el) => {
        if (el === letter) {
            letterCounter += 1
        }
    })
    // console.log(letterCounter);
    return letterCounter / doc.docLength
}
exports.calcLetterCounter = (doc, letter) => {

    try {
        let letterCounter = 0
        // console.log(doc, letter);
        doc.docLetters.split('').map((el) => {
            if (el === letter) {
                letterCounter += 1
            }
        })
        return letterCounter
    }
    catch (err) {
        console.log(err);
    }
}


const maxTermCounter = (doc) => {
    let termsCounters = []
    for (let i = 0; i <= 5; i++) {
        let letterCounter = this.calcLetterCounter(doc, Terms[i])

        termsCounters.push(letterCounter)
    }

    return Math.max(...termsCounters)
}



exports.calculateTF = (term, doc) => {
    const maxCounter = maxTermCounter(doc)
    const termCounter = this.calcLetterCounter(doc, term)
    return termCounter / maxCounter
}



exports.calculateTermIDFI = (term) => {
    let dfi = 0
    for (let i = 1; i <= 10; i++) {
        let doc = this.documentHandler(`${__dirname}/../documents/d${i}.txt`)
        if (doc.docLetters.split('').includes(term)) {
            dfi += 1
        }
    }
    //idfi = log2(Number of docs/ )
    //console.log(term, dfi);
    return Math.log2(10 / dfi)
}
//todo

//let doc = this.documentHandler('utils/../documents/d1.txt')
//console.log(maxTermCounter(doc));
//console.log(calculateTF('a', doc));






