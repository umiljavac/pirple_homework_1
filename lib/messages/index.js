/**
 * Title : Welcome messages library
 * Description : Utility library that manage messages in the messages.txt file
 * Date : 28/08/2018
 */

const fs = require('fs');

const messages = {};

messages.getRandomMessage = () => {

    const fileContents = fs.readFileSync(`${__dirname}/messages.txt`, 'utf-8');

    const arrayMessages = fileContents.split(/\r?\n/);

    const selectedMessage = arrayMessages[getRandomInt(arrayMessages.length)];

    return {
      'message' : selectedMessage
    };

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
};

module.exports = messages;
