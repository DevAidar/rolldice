const router = require('express').Router();

const { index, create, update, remove, login, amount, images, all } = require('../controllers/users-controllers');
const { registerUserValidation, checkIfEmailExists, checkIfUsernameExists, loginValidation } = require('../utils/validations');
const { encryptPasswordOnRequest } = require('../utils/encrypt');
const { checkEmail, checkPassword, createToken, updateToken, logout, verifyToken } = require('../utils/auth');

/** 
 * '/' - get, put, post & delete
 * get: return user info by access token :: index
 * put: will edit user with id :: update
 * post: create new user :: create
 * delete: remove user with id :: remove
*/
router.get('/', verifyToken, index);
router.put('/', verifyToken, update);
router.post('/', registerUserValidation, checkIfEmailExists, checkIfUsernameExists, encryptPasswordOnRequest, create, createToken, login);
router.delete('/', verifyToken, remove);

/**
 * '/all' - get
 * get: get all users :: index
 */
router.get('/all', verifyToken, all);

/**
 * '/login' - post
 * post: login email and password :: login
 */
router.post('/login', loginValidation, checkEmail, checkPassword, createToken, login);
router.delete('/logout', logout);

/**
 * '/token' - post
 * post: get a new access token
 */
router.post('/token', updateToken);

/**
 * '/amount' - get
 * get: return the amount :: amount 
 */
router.get('/amount', amount);

/**
 * '/images' - get
 * get: return all the images associated to the user :: images 
 */
router.get('/images', verifyToken, images);

module.exports = router;