const fs = require('fs')
const random = require('random')
const charGenerator = require('./charGenerator')

const allowedChars = require('./allowedChars')
module.exports = () => {
    for (let i = 1; i <= 10; i++) {
        fs.writeFileSync(`${__dirname}/../documents/d${i}.txt`, charGenerator(allowedChars, random.int(20, 40)))
    }

}
