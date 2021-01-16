'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// connect to database
(async () => {
	const db = require('./models/index');

	try {
		await db.sequelize.authenticate();
		console.log('connection successfully established');
	} catch (err) {
		console.log('ERROR in establishing connection');
	}

	await db.sequelize.sync();
})();

const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));
// app.use(cors());
app.use(express.json());

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

// changes __dirname to parent directory
// const split = __dirname.split('/');
// split.pop();
// __dirname = '/' + split.join('/');

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(process.cwd(), '/client/build')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(process.cwd(), 'client', 'build', 'index.html'))
	);
} else {
	app.get('/', (req, res) => {
		res.send('API is running...');
	});
}

// send 404 if no other route matched
app.use((req, res) => {
	res.status(404).json({
		message: 'Route Not Found'
	});
});

// setup a global error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		error: {}
	});
});

// set our port
const PORT = process.env.PORT || 5000;

// start listening on our port
app.listen(PORT, () => {
	console.log(`Express server is listening on port ${PORT}`);
});
