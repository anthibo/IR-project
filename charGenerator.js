const random = require('random')
/**
 * @param {} allowedChars the allowed character to generate randon chars
 * @param {Number} outputLength The length of the output chars
 */
module.exports = generateRandomChars = (allowedChars, outputLength) => {
    let returnStr = ''
    for (let i = 0; i <= outputLength; i++) {
        const element = allowedChars[random.int(1, 6)];
        returnStr += `${element} `
    }
    return returnStr
}

