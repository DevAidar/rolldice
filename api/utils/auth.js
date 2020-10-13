const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const { token } = require('morgan');

// Check if email is in out db
const checkEmail = (req, res, next) => {
	User.findOne({ email: req.body.email.toLowerCase() })
		.exec((err, user) => {
			if (err) res.status(500).json({ message: `There was an error: ${err}` });
			else if (user) {
				req.body.curUser = user;
				next();
			} else {
				console.log({ error: `Invalid Username${process.env.NODE_ENV === 'production' ? ' or Password' : ''}` });
				res.status(400).json(`Invalid Username${process.env.NODE_ENV === 'production' ? ' or Password' : ''}`);
			};
		});
};

// Check if password is correct

const checkPassword = async (req, res, next) => {
	const validPass = await bcrypt.compare(req.body.password, req.body.curUser.password);
  
	if (!validPass) return res.status(400).send(`Invalid ${process.env.NODE_ENV === 'production' ? 'Username or Password' : 'Password'}`);
	next();
};

const createToken = (req, res, next) => {
	// eslint-disable-next-line no-underscore-dangle
	const accessToken = jwt.sign({ _id: req.body.curUser._id }, process.env.TOKEN_SECRET, { expiresIn: '10m' });
  const refreshToken = jwt.sign({ _id: req.body.curUser._id }, process.env.REFRESH_TOKEN_SECRET);

  RefreshToken.create({ refreshToken });
  // save refresh token in the database
	res.header({ 'access-token': `Bearer ${accessToken}`, 'refresh-token': refreshToken });
  
	next();
};

const verifyToken = (req, res, next) => {
  const authHeader = req.query['access-token'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Access Denied');

	try {
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(verify)
		req.userId = verify._id;
		next();
	} catch (err) {
		res.status(403).send('Invalid Token.');
	}
};

const updateToken = (req, res) => {
  const refreshToken = req.query['refresh-token'];

  if (!refreshToken) return res.status(401).send('Access Denied');
  // if (!refreshTokens.includes(refreshToken)) return res.status(403).send('Access Denied');

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    const accessToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '10m' })
    res.header({ 'access-token': `Bearer ${accessToken}` }).send();
  })
}

const logout = (req, res) => {
  RefreshToken.findOneAndRemove({ refreshToken: req.headers['refresh-token'] }, (err) => {
    console.log(err)
    if (err) res.status(403).send('Invalid Token')
    else res.status(204).send('Success');
  })
}

module.exports = { checkEmail, checkPassword, createToken, verifyToken, updateToken, logout };