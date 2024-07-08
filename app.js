const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const teamRouter = require('./routes/teamRoutes');
const userRouter = require('./routes/userRoutes');
const leagueRouter = require('./routes/leagueRoutes');
const playerRouter = require('./routes/playerRoutes');
const venueRouter = require('./routes/venueRoutes');
const gameRouter = require('./routes/gameRoutes');
const missingPlayerRouter = require('./routes/missingPlayerRoutes');
const settingsRouter = require('./routes/settingsRoutes');

const app = express();

//Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//serve up any static files
app.use(express.static(`${__dirname}/public`));

//routes
app.use('/api/v1/teams', teamRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/leagues', leagueRouter);
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/venues', venueRouter);
app.use('/api/v1/games', gameRouter);
app.use('/api/v1/missingPlayers', missingPlayerRouter);
app.use('/api/v1/settings', settingsRouter);

module.exports = app;
