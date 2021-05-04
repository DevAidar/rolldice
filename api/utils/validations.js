const Joi = require('@hapi/joi');
const User = require('../models/user');

const registerUserValidation = (req, res, next) => {
	const registerUserSchema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		username: Joi.string().min(4).required(),
		email: Joi.string().required().email(),
		password: Joi.string().min(8).required(),
	});

  console.log(req.body);
  
	const { error } = registerUserSchema.validate(req.body);
  
	if (error) res.status(400).send(error.details[0].message);
	else next();
};

const checkIfEmailExists = (req, res, next) => {
	// Take in an email from req body, check if email exists in db
	User.findOne({ email: req.body.email.toLowerCase() })
		.exec((err, user) => {
			if (err) res.status(500).json({ message: `There was an error: ${err}` });
			else if (!user) next();
			else res.status(400).json({ error: 'Email already exists.' });
		});
};

const checkIfUsernameExists = (req, res, next) => {
	User.findOne({ username: req.body.username })
		.exec((err, user) => {
			if (err) res.status(500).json({ message: `There was an error: ${err}` });
			else if (!user) next();
			else res.status(400).json({ error: 'Username already exists.' });
		});
};

const loginValidation = (req, res, next) => {
	const loginSchema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(8).required(),
	});
  
	const { error } = loginSchema.validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);
	
  next();
};

module.exports = { registerUserValidation, checkIfEmailExists, checkIfUsernameExists, loginValidation };