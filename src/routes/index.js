const userRouter = require('../routes/userRoutes');
// const currencyRouter = require('../routes/apiRoutes');

function router(app) {
  app.use(userRouter);
  // app.use(currencyRouter);
}
module.exports = router;
