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


// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port);
})

// routes
app.delete( '/calculator', (req, res)=>{
    console.log('/calculator DELETE HIT');
    historicalCalculations.pop();
    res.send(historicalCalculations);
})

app.delete( '/history', (req, res)=>{
    console.log('/history DELETE HIT');
    historicalCalculations = [];
    res.send(historicalCalculations);
})

app.get( '/calculator', (req, res)=>{
    console.log('/calculator GET HIT');
    res.send(historicalCalculations);
})

app.post( '/calculator', (req, res)=>{
    console.log('/calculator POST HIT', req.body);
    if (req.body.calculation === '+'){
        historicalCalculations.push({firstNumber: req.body.firstNumber, calculation: req.body.calculation,
            secondNumber: req.body.secondNumber, answer: Number(req.body.firstNumber) + Number(req.body.secondNumber)});
    }
    if (req.body.calculation === '-'){
        historicalCalculations.push({firstNumber: req.body.firstNumber, calculation: req.body.calculation,
            secondNumber: req.body.secondNumber, answer: Number(req.body.firstNumber) - Number(req.body.secondNumber)});
    }
    if (req.body.calculation === '*'){
        historicalCalculations.push({firstNumber: req.body.firstNumber, calculation: req.body.calculation,
            secondNumber: req.body.secondNumber, answer: Number(req.body.firstNumber) * Number(req.body.secondNumber)});
    }
    if (req.body.calculation === '÷'){
        historicalCalculations.push({firstNumber: req.body.firstNumber, calculation: req.body.calculation,
            secondNumber: req.body.secondNumber, answer: Number(req.body.firstNumber) / Number(req.body.secondNumber)});
    }
    res.sendStatus(200);
})