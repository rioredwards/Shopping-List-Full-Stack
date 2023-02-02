const express = require('express');
const cookieParser = require('cookie-parser');
const authenticate = require('./middleware/authenticate');
const cors = require('cors');

const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['https://alchemy-shopping-front-end-demo.netlify.app'],
    credentials: true,
  })
);

// App routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/items', authenticate, require('./controllers/items'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
