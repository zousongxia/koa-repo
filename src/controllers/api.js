const KoaRouter = require("koa-router");

const path = require("path");
const fs = require("fs");

const router = new KoaRouter({
  prefix: "/api",
});

const userRouter = require("./api/user");

router.use(userRouter.routes(), userRouter.allowedMethods());

module.exports = router;