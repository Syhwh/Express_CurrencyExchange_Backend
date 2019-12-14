const userRouter = require('../routes/userRoutes');
const apiRouter = require('../routes/apiRoutes');

function router(app) {
  app.use(userRouter);
  app.use(apiRouter);
}
module.exports = router;
