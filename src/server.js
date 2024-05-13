const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("./controllers/api");
const authMiddleware = require("./middleware/auth");

const app = new Koa();

app.use(bodyParser());
app.use(authMiddleware);

app.use(router.routes(), router.allowedMethods());

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
