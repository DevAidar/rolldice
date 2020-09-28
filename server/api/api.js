const router = require('express').Router();

const middlewares = require('../middlewares/middlewares');
const usersRouter = require('./routes/users');

router.use('/users', usersRouter);

router.use(middlewares.notFound);
router.use(middlewares.errorHandler);

module.exports = router;