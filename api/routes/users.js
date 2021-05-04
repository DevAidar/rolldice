const router = require('express').Router();
const multer = require('multer');

const { index, create, getById, update, remove, login, amount, all } = require('../controllers/users-controllers');
const { registerUserValidation, checkIfEmailExists, checkIfUsernameExists, loginValidation } = require('../utils/validations');
const { encryptPasswordOnRequest } = require('../utils/encrypt');
const { checkEmail, checkPassword, createToken, updateToken, logout, verifyToken } = require('../utils/auth');

/** 
 * '/' - get & post
 * get: return user info by access token :: index
 * post: create new user :: create
*/
router.get('/', verifyToken, index);
router.post('/', registerUserValidation, checkIfEmailExists, checkIfUsernameExists, encryptPasswordOnRequest, create, createToken, login);

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
 * '/:id' get put
 * get: is going to return user with id :: getById
 * put: will edit user with id :: update
 * delete: remove user with id :: remove
 */ 
router.get('/:id', verifyToken, getById);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);

module.exports = router;