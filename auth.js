module.exports.isAuthorized = function (req, res, next) {
	if (!req.session.user) {
		res.redirect('/login')
	} else {
		return next()
	}
}

module.exports.isAdmin = function (req, res, next) {
	if (!req.session.user?.isAdmin) {
		res.redirect('/login')
	} else {
		return next()
	}
}
