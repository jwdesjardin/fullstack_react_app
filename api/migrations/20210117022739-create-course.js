'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			estimatedTime: {
				type: Sequelize.STRING
			},
			materialsNeeded: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Users');
	}
};
