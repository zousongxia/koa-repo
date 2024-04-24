const KoaRouter = require("koa-router");
const jwt = require('jsonwebtoken');
const secretKey = 'hwPfZCBCf2npmYj93ma3UDy4e'; // 密钥
const User = require("../../models/userModel");

const router = new KoaRouter({
  prefix: "/user",
});

router.get("/info", async (ctx) => {
  const { name, age } = ctx.query;
  ctx.body = {
    name,
    age,
  };
});

router.post("/login", async (ctx) => {
  const { username, userPassword } = ctx.request.body;
  const user = await User.findOne({ username, userPassword });
  console.log("user", user);
  ctx.body = {
    success: true,
    user,
  };
});

module.exports = router;
