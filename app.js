const express = require('express');
const morgan = require('morgan');

const teamRouter = require('./routes/teamRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//serve up any static files
app.use(express.static(`${__dirname}/public`));

//routes
app.use('/api/v1/teams', teamRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
