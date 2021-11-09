import express from 'express';

const app = express();

// Enable CORS for all the methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello from container!');
});

app.listen(80, () => {
  console.log('listening on port 80');
});
