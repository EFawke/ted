const express = require('express');
const apiRouter = express.Router();

require('./initialiser');

const blogRouter = require('./blogRouter');
const uploadRouter = require('./uploadRouter');

apiRouter.use('/blog', blogRouter);
apiRouter.use('/upload', uploadRouter);

module.exports = apiRouter;