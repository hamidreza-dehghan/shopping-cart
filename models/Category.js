const { DataTypes } = require('sequelize')
const db = require('../db')

const Category = db.define('Category', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
})

module.exports = Category
