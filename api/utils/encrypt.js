const bcrypt = require('bcryptjs');

const encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
};

const encryptPasswordOnRequest = async (req, _, next) => {
	const hashPassword = await (encryptPassword(req.body.password));
	req.body.password = hashPassword;
	next();
};
 
module.exports = { encryptPasswordOnRequest };