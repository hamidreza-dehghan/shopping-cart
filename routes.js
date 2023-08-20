// userRoutes.js

const express = require('express')
const router = express.Router()
const auth = require('./auth')
const userController = require('./controllers/userController')
const categoryController = require('./controllers/categoryController')
const productController = require('./controllers/productController')
const cartController = require('./controllers/cartController')
const params = require('./params')

// Home
router.get('/', async (req, res) => {
	res.render('home', {
		...(await params(req)),
		route: '/',
		title: 'Home',
	})
})

// User {
router.get('/register', userController.registerPage)
router.post('/register', userController.register)

router.get('/login', userController.loginPage)
router.post('/login', userController.login)

router.get('/password-recovery', userController.passwordRecoveryPage)
router.post('/password-recovery', userController.passwordRecovery)

router.get('/logout', userController.logout)

router.get(
	'/change-password',
	auth.isAuthorized,
	userController.changePasswordPage
)
router.post(
	'/change-password',
	auth.isAuthorized,
	userController.changePassword
)
// } User

// Category {
router.get('/categories', categoryController.getAllCategories)
router.post('/categories', auth.isAdmin, categoryController.createCategory)
// } Category

// Product {
router.get('/products', productController.getAllProducts)
router.get(
	'/products/:categoryName',
	productController.getAllProductsFromCategory
)
router.post('/products', auth.isAdmin, productController.createProduct)
router.get(
	'/products/remove/:id',
	auth.isAdmin,
	productController.removeProduct
)
// } Product

// Cart {
router.get('/cart', auth.isAuthorized, cartController.getAll)
router.get('/cart/add/:id', auth.isAuthorized, cartController.add)
router.get('/cart/remove/:id', auth.isAuthorized, cartController.remove)
router.get('/cart/checkout', auth.isAuthorized, cartController.checkout)
router.post('/cart/checkout', auth.isAuthorized, cartController.checkoutAction)
// } Cart

module.exports = router
