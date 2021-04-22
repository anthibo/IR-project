const fs = require('fs')
const random = require('random')
const charGenerator = require('./charGenerator')

const allowedChars = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f'
}
for (let i = 1; i <= 10; i++) {
    fs.writeFileSync(`${__dirname}/documents/d${i}.txt`, charGenerator(allowedChars, random.int(20, 40)))
}
