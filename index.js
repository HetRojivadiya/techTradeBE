const express = require('express');
const finnhub = require('finnhub');
const cors = require('cors');

const app = express();
const port =  process.env.PORT||3001;

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cl65e5hr01ql8jir0680cl65e5hr01ql8jir068g";

const finnhubClient = new finnhub.DefaultApi();
app.use(express.json());

// Use CORS middleware
app.use(cors());

app.post('/stockCandles', (req, res) => {
    console.log(req.body);
        finnhubClient.stockCandles(req.body.symbol,req.body.interval , 1590988249, 1591852249, (error, data, response) => {
        if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
        console.log(data);
      res.json(data);
    }
    });
    });

app.get('/news', (req, res) => {
  finnhubClient.marketNews("general", {}, (error, data, response) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(data);
    }
  });
});

app.get('/fetchData', async (req, res) => {
  try {
    const response = await fetch('https://techtrade-indicators-default-rtdb.firebaseio.com/.json');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
