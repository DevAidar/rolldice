const mongoose = require('mongoose');

const requiredString = {
	type: String,
	required: true, 
};

const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
	refreshToken: {
    type: String,
    required: true, 
	},
});

const RefreshToken = mongoose.model('Refresh Token', refreshTokenSchema);

module.exports = RefreshToken;