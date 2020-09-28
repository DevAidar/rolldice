const router = require('express').Router();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const middlewares = require('../middlewares/middlewares');
const usersRouter = require('./routes/users');

router.use(helmet());
router.use(cors({
	origin: process.env.CORS_ORIGIN,
	// exposedHeaders: 'auth-token',
}));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use('/users', usersRouter);

router.use(middlewares.notFound);
router.use(middlewares.errorHandler);

module.exports = router;