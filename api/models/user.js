'use strict';
const Sequelize = require('sequelize');

module.exports = sequelize => {
	class User extends Sequelize.Model {}
	User.init(
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			emailAddress: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			}
		},
		{ sequelize }
	);

	User.associate = models => {
		User.hasMany(models.Course, {
			as: 'user',
			foreignKey: {
				fieldName: 'userId'
			}
		});
	};

	return User;
};
