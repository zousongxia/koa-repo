const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("./controllers/api");

const app = new Koa();

app.use(bodyParser());

app.use(router.routes(), router.allowedMethods());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
