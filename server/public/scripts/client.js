$(document).ready(onReady);
//global variable for storing current data being input into calculator
let calculationData = [];

function onReady(){
    //posts history to DOM when page is loaded
    getHistory();
    //calls ReRun function when dynamically created button is clicked
    $( '#historyDiv' ).on( 'click', '.rerunButton', rerunCalc );
}

// function to clear the input that is currently being processed when the C button is clicked
function clearInput(){
    // target element to clear
    let el = $('#inputDiv');
    // empty element
    el.empty();
    // target element to clear
    el = $('#outputDiv');
    // empty element
    el.empty();
    // empty currently stored calculation information
    calculationData = [];
}

// function to add a number to the DOM when each button is clicked.
function appendNumber( input ){
    // target the element to modify
    let el = $('#inputDiv');
    // append the number that was passed into the function
    el.append(`<span>${input}</span>`);
    // add the parameter to the global array of inputs
    calculationData.push(input);
}

// function to pull the elements of the equation to be passed to the server
function calculate(){
    // empty the input Div where the information was displayed on the DOM
    $('#inputDiv').empty();
    // variables to store each part of the calculation
    let calculation;
    let firstNumber;
    let secondNumber;

    // loop through the array of inputs to find out if two decimals are next to each other and pass an error
    for (let i = 0; i < calculationData.length; i++){
        if (calculationData[i] === '.' && calculationData[i+1] === '.'){
            alert('Only enter one decimal in a row');
            calculationData =[];
            return;
        }
        
        // loop through the array to find the operator
        if (calculationData[i] === '*' || calculationData[i] === '÷' || 
        calculationData[i] === '+' || calculationData[i] === '-'){
            // once operator is found, determine if next one is an operator as well and pass an error
            // if not, store each part of the calculation in different variables
            if(calculationData[i+1] === '*' || calculationData[i+1] === '÷' || 
            calculationData[i+1] === '+'){
                alert('Only enter one operator into your calculation.');
                calculationData =[];
                return;
            } else {
                calculation = calculationData.slice(i, i+1);
                firstNumber = calculationData.slice (0, i);
                secondNumber = calculationData.slice (i+1, calculationData.length);
            }
        }
    }

    // determine if any of the information is missing to ensure all pieces are available to be sent to the server
    if (!calculation || firstNumber.length === 0 || secondNumber.length === 0){
        alert('Please enter a full calculation including: two numbers and an operator.');
        calculationData =[];
        return;
    }
    //declare object to be sent to server
    let objectToSend = {
        firstNumber: Number(firstNumber.join('')),
        calculation: calculation.join(''),
        secondNumber: Number(secondNumber.join(''))
    }
    // determine if either piece of the operation is not a number and therefore cannot be used in math on the server
    if (Number.isNaN(objectToSend.firstNumber) || Number.isNaN(objectToSend.secondNumber)){
        alert('Please enter valid numbers into your calculation.');
        calculationData =[];
        return;
    }
    // if input passes all tests, POST all information to the server.
    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: objectToSend
    }).then(function (response){
        // empty global variable if there is no error
        calculationData = [];
        // call function to retrieve answer from server
        getAnswer();
    }).catch(function ( err ){
        alert('uh oh, there is an error. Check console for details');
        console.log( err );
    })
}

// function to delete History from the page
function deleteHistory(){
    // confirm user wants to really delete the whole history
    if (confirm('Do you really want to delete your History?')){
        // call a DELETE on the server to remove history
        $.ajax({
            method: 'DELETE',
            url: '/history'
        }).then(function( response ){
            //empty out history Div once history is deleted.
            let el = $('#historyDiv');
            el.empty();
            // keep title of the list of historical calculations
            el.append('<h5 id="historyTitle">History</h5>');
            alert('History Deleted!');
        }).catch(function ( err ){
            alert('uh oh, there is an error. Check console for details');
            console.log( err );
        })
    }
}

// function to delete the last historical calculation only
function deleteLast(){
    // confirm that the user really wants to delete the last calculation
    if(confirm('Are you sure you want to delete the Last Calculation in your History?')){
        $.ajax({
            method: 'DELETE',
            url: '/calculator'
        }).then(function( response ){
            // empty the history div
            let el = $('#historyDiv');
            el.empty();
            el.append('<h5 id="historyTitle">History</h5>');
            //loop through remaining results in history and post to the DOM
            for (let i = 0; i < response.length; i++){
                el.append(`<p id="${i}" class="previousCalcs">${response[i].firstNumber} ${response[i].calculation} 
                ${response[i].secondNumber} <button class="rerunButton">Re-Run Calc</button></p>`);
            }
            alert('Last Calculation Deleted!');
        }).catch(function ( err ){
            alert('uh oh, there is an error. Check console for details');
            console.log( err );
        })
    }
}

// retrieve the answers from the server
function getAnswer(){
    // GET call from server to pass the answers and historical calculations
    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then(function( response ){
        //target output DIV
        let el = $('#outputDiv');
        el.empty();
        //post the last answer to the outputDiv
        el.append(`<span>${response[response.length-1].answer}</span>`);
        // run getHistory function to post history to the DOM
        getHistory();
    }).catch(function ( err ){
        alert('uh oh, there is an error. Check console for details');
        console.log( err );
    })
}

//retrieve your history on page load
function getHistory(){
    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then(function( response ){
        // target history DIV
        let el = $('#historyDiv');
        el.empty();
        el.append('<h5 id="historyTitle">History</h5>');
        // loop through historical calculations and post to the DOM
        for (let i = 0; i < response.length; i++){
            el.append(`<p id="${i}" class="previousCalcs">${response[i].firstNumber} ${response[i].calculation} 
            ${response[i].secondNumber} <button class="rerunButton">Re-Run Calc</button></p>`);
        }
    }).catch(function ( err ){
        alert('uh oh, there is an error. Check console for details');
        console.log( err );
    })
}

// function to rerun any calculation in the history
function rerunCalc(){
    // global variable to gather the index of the relevant calculation
    let indexOfCalc = $(this).parent().attr('id');
    // GET call to pull the information from the server
    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then( function ( response ){
        //target an element and post the answer of the referenced calculation to the output
        let el = $('#outputDiv');
        el.empty();
        el.append(`<span>${response[indexOfCalc].answer}</span>`);
        
        // target an element and post the calculation of the referenced calculation to the input
        el = $('#inputDiv');
        el.empty();
        el.append(`${response[indexOfCalc].firstNumber} ${response[indexOfCalc].calculation} 
            ${response[indexOfCalc].secondNumber}`);
    }).catch( function ( err ){
        alert('uh oh, there is an error. Check console for details');
        console.log( err );
    })
}