const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blog-routes');
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);

module.exports = router;