const router = require('express').Router();
const multer = require('multer');

const { index, create, getById, update, remove, login } = require('../controllers/users-controllers');
const { registerUserValidation, checkIfEmailExists, loginValidation } = require('../utils/validations');
const { encryptPasswordOnRequest } = require('../utils/encrypt');
const { checkEmail, checkPassword, createToken } = require('../utils/auth');

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, './uploads');
	},
	filename: (_, file, cb) => {
		cb(null, new Date().toISOString() + file.originalname);
	},
});

const fileFilter = (_, file, cb) => {
	// reject a file
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: fileFilter,
});

/** 
 * '/' - get & post
 * get: return all users :: index
 * post: create new user :: create
*/
router.get('/', index);
router.post('/', upload.single('profileImage'), registerUserValidation, checkIfEmailExists, encryptPasswordOnRequest, create);

/**
 * '/login' - post
 * post: login email and password :: login
 */
router.post('/login', loginValidation, checkEmail, checkPassword, createToken, login);

/**
 * '/:id' get put
 * get: is going to return user with id :: getById
 * put: will edit user with id :: update
 * delete: remove user with id :: remove
 */ 
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;