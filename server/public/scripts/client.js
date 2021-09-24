$(document).ready(onReady);
let calculationData = [];

function onReady(){
    getHistory();
    $( '#historyDiv' ).on( 'click', '.rerunButton', rerunCalc );
}

function clearInput(){
    let el = $('#inputDiv');
    el.empty();
    el = $('#outputDiv');
    el.empty();
    calculationData = [];
}

function appendNumber( input ){
    let el = $('#inputDiv');
    el.append(`<span>${input}</span>`);
    calculationData.push(input);
}

function calculate(){
    $('#inputDiv').empty();
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
        calculationData = [];
        getAnswer();
    }).catch(function ( err ){
        alert('uh oh, there is an error. Check console for details');
        console.log( err );
    })
}

function deleteHistory(){
    if (confirm('Do you really want to delete your History?')){
        $.ajax({
            method: 'DELETE',
            url: '/history'
        }).then(function( response ){
            let el = $('#historyDiv');
            el.empty();
            el.append('<h5 id="historyTitle">History</h5>');
            alert('History Deleted!');
        }).catch(function ( err ){
            alert('uh oh, there is an error. Check console for details');
            console.log( err );
        })
    }
}

function deleteLast(){
    if(confirm('Are you sure you want to delete the Last Calculation in your History?')){
        $.ajax({
            method: 'DELETE',
            url: '/calculator'
        }).then(function( response ){
            let el = $('#historyDiv');
            el.empty();
            el.append('<h5 id="historyTitle">History</h5>');
    
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

function getAnswer(){
    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then(function( response ){
        let el = $('#outputDiv');
        el.empty();
        el.append(`<span>${response[response.length-1].answer}</span>`);

        let elToo = $('#historyDiv');
        elToo.empty();
        elToo.append('<h5 id="historyTitle">History</h5>');
        for (let i = 0; i < response.length; i++){
            elToo.append(`<p id="${i}" class="previousCalcs">${response[i].firstNumber} ${response[i].calculation} 
            ${response[i].secondNumber} <button class="rerunButton">Re-Run Calc</button></p>`);
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
        let el = $('#historyDiv');
        el.empty();
        el.append('<h5 id="historyTitle">History</h5>');
        for (let i = 0; i < response.length; i++){
            el.append(`<p id="${i}" class="previousCalcs">${response[i].firstNumber} ${response[i].calculation} 
            ${response[i].secondNumber} <button class="rerunButton">Re-Run Calc</button></p>`);
        }
    }).catch(function ( err ){
        alert('uh oh, there is an error. Check console for details');
        console.log( err );
    })
}

function rerunCalc(){
    let indexOfCalc = $(this).parent().attr('id');

    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then( function ( response ){
        let el = $('#outputDiv');
        el.empty();
        el.append(`<span>${response[indexOfCalc].answer}</span>`);
        
        el = $('#inputDiv');
        el.empty();
        el.append(`${response[indexOfCalc].firstNumber} ${response[indexOfCalc].calculation} 
            ${response[indexOfCalc].secondNumber}`);
    }).catch( function ( err ){
        alert('uh oh, there is an error. Check console for details');
        console.log( err );
    })
}