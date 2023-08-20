// userController.js
const path = require('path')
const bcrypt = require('bcrypt')
const db = require('../db')
const User = require('../models/User')
const params = require('../params')

exports.loginPage = async (req, res) => {
	res.render('login', {
		...(await params(req)),
		route: 'login',
		title: 'Login',
	})
}
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body

		// Find the user by username
		const user = await User.findOne({ where: { email } })

		// Check if user exists and password is correct
		if (user && (await bcrypt.compare(password, user.password))) {
			req.session.user = user
			req.session.cart = { list: [], count: 0, sum: 0 }
			res.redirect(`/`)
		} else {
			res.status(401).json({ message: 'Invalid username or password' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'An error occurred during login' })
	}
}

exports.changePasswordPage = async (req, res) => {
	res.render('change-password', {
		...(await params(req)),
		route: 'change-password',
		title: 'Change Password',
	})
}
exports.changePassword = async (req, res) => {
	try {
		const { currentPassword, newPassword } = req.body
		const id = req.session.user.id // Get the username from the session

		// Find the user by username
		const user = await User.findOne({ where: { id } })

		// Check if the current password is correct
		if (await bcrypt.compare(currentPassword, user.password)) {
			// Hash the new password
			const hashedPassword = await bcrypt.hash(newPassword, 10)

			// Update the user's password
			await User.update({ password: hashedPassword }, { where: { id } })

			res.status(200).json({ message: 'Password updated successfully!' })
		} else {
			res.status(401).json({ message: 'Invalid current password' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'An error occurred while updating the password',
		})
	}
}

exports.logout = async (req, res) => {
	// Destroy the session to log out the user
	req.session.destroy((err) => {
		if (err) {
			console.error('Error destroying session:', err)
		}
		res.redirect('/')
	})
}

exports.registerPage = async (req, res) => {
	res.render('register', {
		...(await params(req)),
		route: 'register',
		title: 'Registration',
	})
}
exports.register = async (req, res) => {
	try {
		const { name, password, email } = req.body

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10)

		// Create a new user
		const user = await User.create({
			name,
			password: hashedPassword,
			email,
			isAdmin: false,
		})

		res.status(201).json({ message: 'User registered successfully!' })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'An error occurred during registration',
		})
	}
}

exports.passwordRecoveryPage = async (req, res) => {
	res.render('password-recovery', {
		...(await params(req)),
		route: 'password-recovery',
		title: 'Password Recovery',
	})
}
exports.passwordRecovery = async (req, res) => {
	try {
		const { email } = req.body

		// Find the user by email
		const user = await User.findOne({ where: { email } })

		// Implement password recovery logic here
		// Send password recovery instructions to the user's email

		res.status(200).json({
			message: 'Password recovery instructions sent successfully!',
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'An error occurred during password recovery',
		})
	}
}
