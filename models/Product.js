const { DataTypes } = require('sequelize')
const db = require('../db')
const Category = require('./Category')

const Product = db.define('Product', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	categoryId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
})

Product.belongsTo(Category, { foreignKey: 'categoryId' })
Category.hasMany(Product, { foreignKey: 'categoryId' })

module.exports = Product
