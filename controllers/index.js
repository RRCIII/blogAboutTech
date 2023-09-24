const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const dashBoardRoutes = require('./dashboardRoutes')
const apiRoutes = require('./api')

router.use('/', homeRoutes);
router.use('/dashboard', dashBoardRoutes);
router.use('/api', apiRoutes);

module.exports = router;