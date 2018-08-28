/**
 * Title : main file for the Hello World API
 * Description : send a welcome message when client use /hello route with POST method
 * Date : 28/08/2018
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
// message sent when client use a POST method
const message = require('./lib/messages');

const httpServer = http.createServer((req, res) => {

    // Get the URL and parse it, second argument (true) allow to also parse the query string
    const parsedUrl = url.parse(req.url, true);
    // Get the path
    const path = parsedUrl.pathname;
    // remove the first or last '/' contained in the path
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    // Get the query string as an object
    const queryStringObject = parsedUrl.query;
    // get the HTTP method
    const method = req.method.toLowerCase();
    // get the headers as an object
    const headers = req.headers;
    // get the payload
    const decoder = new StringDecoder();
    // buffer string variable will be fill with the payload decoded data or stay empty if no payload is posted
    let buffer = '';
    // On data event, fill the buffer
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        const choosenHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // construct the data object to send to the handler
        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        // If the method was POST send the welcome message, else an empty string;
        const isPostMethod = (data, payloadString) => {
            data.method === 'post' ? res.end(payloadString) : res.end();
        };

        choosenHandler(data, (statusCode, payload) => {

            statusCode = typeof statusCode === 'number' ? statusCode : 200;
            payload = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);

            res.setHeader('Content-type', 'application/json');
            res.writeHead(statusCode);

            isPostMethod(data, payloadString);
        });
    });
});

const handlers = {};

handlers.hello = (data, callback) => {
    callback(200, message.getRandomMessage());
};

handlers.notFound = (data, callback) => {
    callback(404);
};

const router = {
  'hello' : handlers.hello
};

httpServer.listen(config.httpPort, () => {
    console.log(`Hello World Api listening on port ${config.httpPort} in ${config.envName} environment.` )
});
