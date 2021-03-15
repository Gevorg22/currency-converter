"use strict";

const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

let rates = {};



const date = document.querySelector('.date');
let now = new Date().toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
let szDate = `Курс валюты на ${now}`;
date.textContent = szDate;


getCurrencies();
convertResult(select);
convertResult(input);

async function getCurrencies () {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = data;

    rates = result.Valute;

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);

    Object.values(rates).map(elem => {
        const option = document.createElement('option');
        option.textContent = elem.Name;
        option.setAttribute('value', elem.CharCode);
        select.append(option);
    });
    
    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
    } else {
        elementUSD.classList.add('bottom');
    }

    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
    } else {
        elementEUR.classList.add('bottom');
    }

    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('top');
    } else {
        elementGBP.classList.add('bottom');
    }
}

function convertResult ( item ) {
    item.addEventListener('input', () => {
        result.value = (parseFloat(input.value) / rates[select.value].Value * rates[select.value].Nominal).toFixed(2);
    });
}