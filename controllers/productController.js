const Product = require('../models/Product')
const Category = require('../models/Category')
const params = require('../params')

exports.getAllProducts = async (req, res) => {
	try {
		let products = await Product.findAll()
		if (req.session.cart) {
			products = products.map((item) => {
				item.isInCart = false
				if (req.session.cart?.list?.find((x) => x.id === item.id))
					item.isInCart = true
				return item
			})
		}
		res.render('products', {
			...(await params(req)),
			route: 'products',
			title: 'Products',
			products,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'An error occurred while fetching products',
		})
	}
}

exports.getAllProductsFromCategory = async (req, res) => {
	try {
		const { categoryName } = req.params
		const category = await Category.findOne({
			where: { name: categoryName },
		})
		let products = await Product.findAll({
			where: { categoryId: category.id },
		})
		if (req.session.cart) {
			products = products.map((item) => {
				item.isInCart = false
				if (req.session.cart?.list?.find((x) => x.id === item.id))
					item.isInCart = true
				return item
			})
		}
		res.render('products', {
			...(await params(req)),
			route: 'products',
			title: 'Products',
			products,
			category,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'An error occurred while fetching products',
		})
	}
}

exports.createProduct = async (req, res) => {
	try {
		const { name, price, categoryId } = req.body
		console.log('DATA >>>', name, price, categoryId)
		await Product.create({ name, price, categoryId })
		res.redirect(req.get('Referrer'))
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'An error occurred while creating a product',
		})
	}
}

exports.removeProduct = async (req, res) => {
	try {
		const { id } = req.params
		await Product.destroy({ where: { id } })
		res.redirect(req.get('Referrer'))
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'An error occurred while removing a product',
		})
	}
}
