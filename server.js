const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4000;

app.use(express.static('public'));
// Send back a random quote from the quotes data.
app.get('/api/quotes/random', (req, res, next) => {
  res.send({
    quote: getRandomElement(quotes)
  });
});
//If there is a query string with a person attribute, the route should return all quotes said by the same person.
// If there are no quotes for the requested person, send back an empty array
app.get('/api/quotes', (req, res, next) => {
  if (req.query.person !== undefined) {
  const quotesByPerson = quotes.filter(quote => quote.person === req.query.person);
    res.send({
      quotes: quotesByPerson
    });
  } else {
    res.send({
      quotes: quotes
    });
  }
});
// New quotes will be passed in a query string with two properties: quote with the quote text itself, and person with the person who is credited with saying the quote.
app.post('/api/quotes', (req, res) => {
  const newQuote = {
    quote: req.query.quote,
    person: req.query.person
  };
  if (newQuote.quote && newQuote.person) {
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});