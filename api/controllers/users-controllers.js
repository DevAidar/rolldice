const User = require('../models/user');

const login = (_, res) => res.status(200).json('Logged in!');

const index = (req, res) => {
	if (!req.userId)
    return res.status(404).json({ message: 'Could not find a user with that id.' });
		
  User.findById(req.userId)
    .exec((err, user) => {
      if (!user) return res.status(404).json({ message: 'Could not find a user with that id.' });
      if (err) return res.status(500).json({ message: `There was an error with our database: ${err}` });
      
      res.status(200).json({ firstName: user.firstName, lastName: user.lastName, username: user.username, profileImage: user.profileImage, userId: req.userId });
    });
};

const all = (req, res) => {
	User.find()
		.exec((err, docs) => {
			if (err) return res.status(500).json({ message: `There was an error with our database: ${err}!` });
			if (docs.length === 0) return res.status(404).json({ message: 'There were no users found' });
			
      if (req.query.from) 
        return res.status(200).json(
          docs
            .filter(user => user.id !== req.userId)
            .slice(parseInt(req.query.from), req.query.amount ? parseInt(req.query.from) + parseInt(req.query.amount) : parseInt(req.query.from) + 10)
            .map((elem) => ({ _id: elem._id, firstName: elem.firstName, lastName: elem.lastName, username: elem.username, profileImage: elem.profileImage })),
        );

      res.status(200).json(docs.map((elem) => ({ _id: elem._id, firstName: elem.firstName, lastName: elem.lastName, username: elem.username, profileImage: elem.profileImage })));
		});
};

const create = (req, res, next) => {
	req.body.email = req.body.email.toLowerCase();
  
	User.create(req.body)
		.then((user) => {
			req.body.curUser = { _id: user._id };
			next();
		})
		.catch((err) => res.status(500).json({ error: err.message }));
};

const getById = (req, res) => {
  if (req.userId !== req.params.id)
    return res.status(404).json({ message: 'Could not find a user with that id.' });

	User.findById(req.params.id)
		.exec((err, user) => {
			if (!user) return res.status(404).json({ message: 'Could not find a user with that id.' });
			if (err) return res.status(500).json({ message: `There was an error with our database: ${err}` });
			
      res.status(200).json(user);
		});
};

const update = (req, res) => {
  if (req.userId !== req.params.id)
    return res.status(404).json({ message: 'Could not find a user with that id.' });

	User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, user) => {
		if (err) return res.status(404).json({ message: 'Could not find a user with that id.' });
		res.status(200).json(user);
	});
};

const remove = (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, user) => {
		if (err) return res.status(404).json({ message: 'Could not find a user with that id.' });
		res.status(200).json(user);
	});
};

const amount = (_, res) => {
	User.find()
		.exec((err, docs) => {
			if (err) return res.status(500).json({ message: `There was an error with our database: ${err}!` });
			res.status(200).json(docs.length);
		});
};

const images = (req, res) => {
  if (!req.userId)
    return res.status(404).json({ message: 'Could not find a user with that id.' });
  
  User.findById(req.userId)
    .exec((err, user) => {
      if (!user) return res.status(404).json({ message: 'Could not find a user with that id.' });
      if (err) return res.status(500).json({ message: `There was an error with our database: ${err}` });
      
      res.status(200).json({ images: user.images });
    });
};

module.exports = { index, create, getById, update, remove, login, amount, images, all };