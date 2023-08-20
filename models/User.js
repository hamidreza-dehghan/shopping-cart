const { DataTypes } = require('sequelize')
const db = require('../db')

const User = db.define('User', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		default: false,
	},
})

module.exports = User
