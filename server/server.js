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
// DELETE route for last calculation
app.delete( '/calculator', (req, res)=>{
    console.log('/calculator DELETE HIT');
    historicalCalculations.pop();
    res.send(historicalCalculations);
})
//DELETE route for all history. Not sure how to run two delete routes on same URL
app.delete( '/history', (req, res)=>{
    console.log('/history DELETE HIT');
    historicalCalculations = [];
    res.send(historicalCalculations);
})
//GET route for all historical calculations
app.get( '/calculator', (req, res)=>{
    console.log('/calculator GET HIT');
    res.send(historicalCalculations);
})
// POST route for performing and storing Mathmatical calculations
app.post( '/calculator', (req, res)=>{
    console.log('/calculator POST HIT', req.body);
    //Run addition if the calculation submitted is addition
    if (req.body.calculation === '+'){
        historicalCalculations.push({firstNumber: req.body.firstNumber, calculation: req.body.calculation,
            secondNumber: req.body.secondNumber, answer: Number(req.body.firstNumber) + Number(req.body.secondNumber)});
    }
    //Run subtraction if the calculation submitted is subtraction
    if (req.body.calculation === '-'){
        historicalCalculations.push({firstNumber: req.body.firstNumber, calculation: req.body.calculation,
            secondNumber: req.body.secondNumber, answer: Number(req.body.firstNumber) - Number(req.body.secondNumber)});
    }
    //Run multiplication if the calculation submitted is multiplication
    if (req.body.calculation === '*'){
        historicalCalculations.push({firstNumber: req.body.firstNumber, calculation: req.body.calculation,
            secondNumber: req.body.secondNumber, answer: Number(req.body.firstNumber) * Number(req.body.secondNumber)});
    }
    //Run division if the calculation submitted is division
    if (req.body.calculation === '÷'){
        historicalCalculations.push({firstNumber: req.body.firstNumber, calculation: req.body.calculation,
            secondNumber: req.body.secondNumber, answer: Number(req.body.firstNumber) / Number(req.body.secondNumber)});
    }
    res.sendStatus(200);
})