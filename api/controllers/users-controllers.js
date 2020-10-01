const User = require('../models/user');

const login = (_, res) => res.status(200).json('Logged in!');

const index = (_, res) => {
	User.find()
		.exec((err, docs) => {
			if (err) res.status(500).json({ message: `There was an error with our database: ${err}!` });
			else if (docs.length === 0) res.status(404).json({ message: 'There were no users found' });
			else res.status(200).json(docs);
		});
};

const create = (req, res) => {
	const temp = {
		...req.body,
		profileImage: req.file.path, 
	};
	console.log(temp);
	User.create(temp)
		.then((user) => res.status(200).json(user))
		.catch((err) => res.status(500).json({ Error: err.message }));
};

const getById = (req, res) => {
	User.findById(req.params.id)
		.exec((err, user) => {
			if (!user) res.status(404).json({ message: 'Could not find a user with that id.' });
			else if (err) res.status(500).json({ message: `There was an error with our database: ${err}` });
			else res.status(200).json(user);
		});
};

const update = (req, res) => {
	User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, user) => {
		if (err) res.status(404).json({ message: 'Could not find a user with that id.' });
		else res.json(user);
	});
};

const remove = (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, user) => {
		if (err) res.status(404).json({ message: 'Could not find a user with that id.' });
		else res.status(200).json(user);
	});
};

module.exports = { index, create, getById, update, remove, login };