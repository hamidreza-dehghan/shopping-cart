const Product = require('../models/Product')
const params = require('../params')

exports.getAll = async (req, res) => {
	try {
		const { cart } = req.session
		res.render('cart', {
			...(await params(req)),
			route: 'cart',
			title: 'Cart',
			cart,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'An error occurred while fetching cart',
		})
	}
}

exports.add = async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findOne({ where: { id } })
		req.session.cart = {
			list: [
				...req.session?.cart?.list,
				{ id: product.id, name: product.name, price: product.price },
			],
			count: +req.session.cart.count + 1,
			sum: Number(req.session.cart.sum) + Number(product.price),
		}
		res.redirect(req.get('Referrer'))
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'An error occurred while adding item to cart',
		})
	}
}
exports.remove = async (req, res) => {
	try {
		const { id } = req.params
		const product = Product.findOne({ where: { id } })
		const list = req.session.cart.list.filter((item) => +item.id !== +id)
		req.session.cart = {
			list,
			count: +req.session.cart.count - 1,
			sum: Number(req.session.cart.sum) - Number(product.price),
		}
		res.redirect(req.get('Referrer'))
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'An error occurred while removing item from cart',
		})
	}
}
exports.checkout = async (req, res) => {
	res.render('checkout', {
		...(await params(req)),
		route: 'cart',
		title: 'Checkout',
	})
}
exports.checkoutAction = async (req, res) => {
	req.session.cart = { list: [], count: 0, sum: 0, checkout: true }
	res.render('cart', {
		...(await params(req)),
		route: 'cart',
		title: 'Checkout',
	})
}
