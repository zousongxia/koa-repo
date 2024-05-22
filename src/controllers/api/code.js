const KoaRouter = require("koa-router");

const router = new KoaRouter({
  prefix: "/code",
});

router.get("/concurrent", async (ctx) => {
  function sleep(seconds) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, seconds);
    });
  }

  const n = Math.random() * 3000;

  await sleep(n);
  ctx.body = {
    success: true,
  };
});

router.get("/timeout-retry", async (ctx) => {
  function sleep(seconds) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, seconds);
    });
  }

  const n = Math.random() * 10000;

  await sleep(n);
  ctx.body = {
    success: true,
  };
});

module.exports = router;
