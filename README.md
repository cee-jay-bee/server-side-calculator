# Server Side Calculator
===

Description
---
Created a calculator that takes input from the user and sends that information to the server to perform calculations and store historical calculations on the server. The answer is then retrieved with an AJAX GET and displayed for the user to see. 

Previous calculations are displayed on the screen and can be run again. Additionally, the last or all historical calculations can be deleted by the user.

This was solved by creating client side logic to parse out intended calculation, and server side logic to perform mathematical operations and story information on the server. Executed through AJAX POST, GET, and DELETE routes throughout.

Screen Shot
---
![Screenshot](/images/server-side-calculator.png)

Prerequisites
---
- HTML
- CSS
- JS
- JQuery
- Node
- Express

Installation
---
Spin Up
---

- node installed
- ' git init '
- ' npm init --y '
- ' npm install express'
- in package.json, update the "scripts" object:

'''
"start": "node server/server.js"
'''

- create server folder and server.js

- in server.js:

'''
// requires
let express = require( 'express' );
let app = express();

// uses
app.use( express.static( 'server/public'));
app.use( bodyParser.urlencoded( {extended: true}));

// global variables
const port = 3000;

// spin up server
app.listen( port, () => {
    console.log( 'server up on', port);
})

// routes
'''

- test server with ```npm start```
- stop process with control-C

Phase 2: basic routes
===

- in server.js

'''
app.get( '/', ( req, res ) => {
    console.log ( 'get route hit ');
    res.send ( 'example' );
})

app.post( '/', ( req, res ) => {
    console.log ( 'get route hit ');
    res.send ( 'example' );
})
'''

- restart server ('''ctrl+c''' to stop '''npm start''' to restart)
- open 'localhost:3000 in your browser to view
- try 'localhost:3000'

Usage
---
Functions similarly to a calculator in the wild with a few exceptions:
1. Only run one operation at a time.
2. After re-running an operation, must clear before attempting another operation
3. Negative Numbers work for first number but do not as second Number.

Input a Number, then an operator, then a second number and receive a result once you click equals.

Clear button will clear all input and output on screen.
Delete Last will remove Last Historical Operation
Delete Hist will delete all historical operations.

Acknowledgment
---
- My wonderful wife who continues to support me and beta test my coding
- My amazing Tuesday/Thursday morning group who continues to show how much of a rockstar they all are.
- Dev, for continuing to make this information easily digestible, even if I still don't understand why this works. ;)
