const Category = require('../models/Category')
const params = require('../params')

exports.getAllCategories = async (req, res) => {
	try {
		res.render('categories', {
			...(await params(req)),
			route: 'categories',
			title: 'Categories',
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'An error occurred while fetching categories',
		})
	}
}

exports.createCategory = async (req, res) => {
	try {
		const { name } = req.body
		await Category.create({ name })
		res.redirect('/categories')
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'An error occurred while creating a category',
		})
	}
}
