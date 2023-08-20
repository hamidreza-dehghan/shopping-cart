const Category = require('./models/Category')

const params = async (req, res) => {
	const categories = await Category.findAll()
	const { user, cart } = req.session
	return { categories, user, cart, year: new Date().getFullYear() }
}

module.exports = params
