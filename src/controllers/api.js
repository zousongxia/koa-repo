const KoaRouter = require("koa-router");

const router = new KoaRouter({
  prefix: "/api",
});

const userRouter = require("./api/user");
const codeRouter = require("./api/code");

router.use(
  userRouter.routes(),
  codeRouter.routes(),
  userRouter.allowedMethods()
);

module.exports = router;
