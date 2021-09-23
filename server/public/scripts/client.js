$(document).ready(onReady);
let calculationData = [];



function onReady(){
    getHistory();
}

function clearOutput(){
    let el = $('#outputDiv');
    el.empty();
    calculationData = [];

}

function appendNumber( input ){
    console.log('in the Append:', input);
    let el = $('#outputDiv');
    el.append(`<br><br><span>${input}</span>`);
    calculationData.push(input);
    console.log(calculationData);
}

function calculate(){
    let calculation;
    let firstNumber;
    let secondNumber;

    for (let i = 0; i < calculationData.length; i++){
        if (calculationData[i] === '*' || calculationData[i] === '÷' || 
        calculationData[i] === '+' || calculationData[i] === '-'){
            calculation = calculationData.slice(i, i+1);
            firstNumber = calculationData.slice (0, i);
            secondNumber = calculationData.slice (i+1, calculationData.length);
        }
    }
    let objectToSend = {
        firstNumber: Number(firstNumber.join('')),
        calculation: calculation.join(''),
        secondNumber: Number(secondNumber.join(''))
    }

    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: objectToSend
    }).then(function (response){
        console.log(response);
    }).catch(function ( err ){
        alert('uh oh, there is an error. Check console for details');
        console.log( err );
    })

    getAnswer();
}

function deleteHistory(){
    $.ajax({
        method: 'DELETE',
        url: '/calculator'
    }).then(function( response ){
        let el = $('#historicalCalc');
        el.empty();
        alert('History Deleted!');
    }).catch(function ( err ){
        alert('uh oh, there is an error. Check console for details');
        console.log( err );
    })
}

function getAnswer(){
    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then(function( response ){
        let el = $('#outputDiv');
        el.empty();
        el.append(`<br><br><span>${response[response.length-1].answer}</span>`);

        let elToo = $('#historicalCalc');
        elToo.empty();
        
        for (let i = 0; i < response.length; i++){
            elToo.append(`<li class="previousCalcs">${response[i].firstNumber} ${response[i].calculation} ${response[i].secondNumber}</li>`);
        }
    }).catch(function ( err ){
        alert('uh oh, there is an error. Check console for details');
        console.log( err );
    })
}

function getHistory(){
    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then(function( response ){
        let el = $('#historicalCalc');
        el.empty();
        for (let i = 0; i < response.length; i++){
            el.append(`<li class="previousCalcs">${response[i].firstNumber} ${response[i].calculation} ${response[i].secondNumber}</li>`);
        }
    }).catch(function ( err ){
        alert('uh oh, there is an error. Check console for details');
        console.log( err );
    })
}