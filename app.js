const express = require('express')
const layouts = require('express-ejs-layouts')
const session = require('express-session')
const bodyParser = require('body-parser')
const routes = require('./routes')
const path = require('path')
const db = require('./db')

const app = express()

app.set('view engine', 'ejs')
app.use(layouts)
app.set('layout', './layout')
app.set('views', path.join(__dirname, 'views'))

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configure and use express-session middleware
app.use(
	session({
		secret: 'your-secret-key',
		resave: false,
		saveUninitialized: true,
	})
)

// Authenticate the database connection
db.authenticate()
	.then(() => {
		console.log(
			'Connection to the database has been established successfully.'
		)
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error)
	})

// Synchronize the models with the database
db.sync()
	.then(() => {
		console.log('Models synchronized with the database.')
	})
	.catch((error) => {
		console.error('Unable to synchronize models with the database:', error)
	})

// app.use(authChecker)

app.use('/', routes)

// Start the server
app.listen(3000, () => {
	console.log('Server started on port 3000')
})
