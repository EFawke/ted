const express = require('express');
const apiRouter = express.Router();

require('./initialiser.ts');

const blogRouter = require('./blogRouter.ts');
const uploadRouter = require('./uploadRouter.ts');

apiRouter.use('/blog', blogRouter);
apiRouter.use('/upload', uploadRouter);

module.exports = apiRouter;