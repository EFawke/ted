const express = require('express');
const apiRouter = express.Router();

require('./initialiser.ts');

const blogRouter = require('./blogRouter.ts');

apiRouter.use('/blog', blogRouter);

module.exports = apiRouter;