const mongoose = require('mongoose');

const requiredString = {
	type: String,
	required: true, 
};

const { Schema } = mongoose;

const userSchema = new Schema({
	firstName: {
		...requiredString,
		trim: true,
	},
	lastName: {
		...requiredString,
		trim: true,
	},
	username: {
		...requiredString,
		minlength: 4,
		maxlength: 32,
	},
	password: {
		...requiredString,
		minlength: 8,
	},
	email: {
		...requiredString,
		trim: true,
	},
	profileImage: {
		...requiredString,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;