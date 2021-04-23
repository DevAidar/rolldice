const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const apiRouter = require('./api/api');

require('localenv');
require('dotenv').config();
require('./config/db');

const app = express();
const publicPath = path.join(__dirname, 'client' ,'build');
const uploadsPath = path.join(__dirname, 'uploads');
const port = process.env.PORT || 5000;

console.log('Cors used: ', process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.CORS_ORIGIN)

app.use(morgan('common')); 
app.use(cors({
	origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.CORS_ORIGIN, 
	exposedHeaders: ['access-token', 'refresh-token'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRouter);
app.use('/uploads', express.static(uploadsPath));

app.use(express.static(publicPath));
app.use('*', (_, res) => {
	res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Listening at http://localhost:${port}`);
});