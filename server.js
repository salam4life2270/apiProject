const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
 if (randomQuote) {
   res.json({ quote: randomQuote})
 } else {
   res.status(404).send();
 }
})

app.get('/api/quotes', (req, res) => {
    const { person } = req.query;
  
    // If no query param 'person', return all quotes
    if (!person) {
      return res.json({ quotes });
    }
  
    // If there is a query string with 'person' attribute
    const personQuotes = quotes.filter(quote => quote.person === person);
  
    // Send back an array of quotes by the requested person
    res.json({ quotes: personQuotes });
  });

  app.post('/api/quotes', (req, res, next) => {
    const {quote, person}= req.query;
    
    
    
      // Add the new quote object to the data array
      const newQuote = { quote, person };
      quotes.push(newQuote);
    
      // Send back a response with the new quote object
      res.status(201).json({ quote: newQuote });
    });

app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`)})