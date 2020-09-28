const path = require('path');
const express = require('express');
const morgan = require('morgan');

const apiRouter = require('./api/api');

require('dotenv').config();
require('./config/db');

const app = express();
const publicPath = path.join(__dirname, '..', 'build');
const uploadsPath = path.join(__dirname, '..', 'uploads');
const port = process.env.PORT || 3000;

app.use(morgan('common'));

app.use('/api', apiRouter);
app.use('/uploads', express.static(uploadsPath));

app.use(express.static(publicPath));
app.use((_, res) => {
	res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Listening at http://localhost:${port}`);
});