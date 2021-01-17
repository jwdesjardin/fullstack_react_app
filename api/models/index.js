'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize;

if (process.env.NODE_ENV === 'production') {
	console.log('prod 1');
	sequelize = new Sequelize(
		process.env.DB_DATABASE,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: process.env.HOST,
			dialect: 'postgres',
			native: true,
			ssl: true
		}
	);
} else {
	console.log('dev 2');
	sequelize = new Sequelize(
		process.env.DB_DATABASE,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: process.env.HOST,
			dialect: 'postgres',
			native: true,
			ssl: true
		}
	);
}

fs
	.readdirSync(__dirname)
	.filter(file => {
		return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
