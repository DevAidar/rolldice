const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Check if email is in out db
const checkEmail = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.exec((err, user) => {
			if (err) res.status(500).json({ message: `There was an error: ${err}` });
			else if (user) {
				req.body.curUser = user;
				next();
			} else {
				console.log({ error: `Invalid Username${process.env.NODE_ENV === 'production' ? ' or Password' : ''}` });
				res.status(400).json({ error: `Invalid Username${process.env.NODE_ENV === 'production' ? ' or Password' : ''}` });
			};
		});
};

// Check if password is correct

const checkPassword = async (req, res, next) => {
	const validPass = await bcrypt.compare(req.body.password, req.body.curUser.password);
  
	if (!validPass) return res.status(400).send({ error: `Invalid ${process.env.NODE_ENV === 'production' ? 'Username or Password' : 'Password'}` });
	next();
};

const createToken = (req, res, next) => {
	// eslint-disable-next-line no-underscore-dangle
	const token = jwt.sign({ _id: req.body.curUser._id }, process.env.TOKEN_SECRET);
	res.header('authToken', token).send(token);
  
	next();
};

const verifyToken = (req, res, next) => {
	const token = req.header('authToken');
	if (!token) return res.status(401).send('Access Denied');

	try {
		const verify = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verify;
		next();
	} catch (err) {
		res.status(400).send('Invalid Token.');
	}
};

module.exports = { checkEmail, checkPassword, createToken, verifyToken };