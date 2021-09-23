// requires
const express = require( 'express' );
const app = express();
const bodyParser = require ( 'body-parser' );

// uses
app.use( express.static( 'server/public'));
app.use( bodyParser.urlencoded( {extended: true}));

// globals
const port = 3000;
let historicalCalculations = [];
let historicalAnswers = [];


// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port);
})

// routes
app.get( '/calculator', (req, res)=>{
    console.log('/calculator GET HIT');
    res.send(historicalAnswers);
})

app.post( '/calculator', (req, res)=>{
    console.log('/calculator POST HIT', req.body);
    if (req.body.calculation === '+'){
        historicalAnswers.push(Number(req.body.firstNumber) + Number(req.body.secondNumber));
    }
    if (req.body.calculation === '-'){
        historicalAnswers.push(Number(req.body.firstNumber) - Number(req.body.secondNumber));
    }
    if (req.body.calculation === '*'){
        historicalAnswers.push(Number(req.body.firstNumber) * Number(req.body.secondNumber));
    }
    if (req.body.calculation === '÷'){
        historicalAnswers.push(Number(req.body.firstNumber) / Number(req.body.secondNumber));
    }
    historicalCalculations.push(req.body);
    console.log(historicalCalculations, historicalAnswers);
    res.sendStatus(200);
})