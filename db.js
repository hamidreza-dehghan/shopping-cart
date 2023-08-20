const { Sequelize } = require('sequelize')

// Create and export the database connection instance
module.exports = new Sequelize('shopping_cart', 'root', '', {
	dialect: 'mysql',
	host: 'localhost',
})
