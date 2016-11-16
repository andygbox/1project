/** TASK 3A */
const express = require('express');
const fetch = require('node-fetch');

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

const app = express();
let pc;

fetch(pcUrl)
  .then(response => response.json())
  .then((pcData) => {
    pc = pcData;
  })
  .catch(e => console.log('Опс, ошибка:', e));

console.log('Парсим JSON');
app.get('/', (req, res) => {
  res.json(pc);
  console.log('Парсинг ОК');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/task3a/volumes', (req, res) => {
  const result = {};
  pc.hdd.forEach((el) => {
    result[el.volume] = (result[el.volume] || 0) + el.size;
  });
  Object.keys(result).forEach((el) => {
    result[el] = `${result[el]}B`;
  });
  res.json(result);
});

const name = obj =>
  ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

app.get('/task3a(/*)?', (req, res) => {
  const zapchasti = req.url.split('/')
    .filter(el => el).slice(1)
    .reduce((prev, curr) => {
      if (name(prev) === 'object') {
        if ({}.hasOwnProperty.call(prev, curr)) {
          return prev[curr];
        }
      } else if (name(prev) === 'array') {
        if (!isNaN(curr)) {
          return prev[curr];
        }
      }
        return undefined;
    }, 
    pc);

  if (zapchasti === undefined) {
    res.status(404).send('Not Found');
  }

  res.json(zapchasti);
  console.log('Завершено');
});

app.listen(3000, () => {
  	console.log('Your app listening on port 3000!');
});
