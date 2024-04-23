const Koa = require("koa");
const app = new Koa();
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function run() {
  try {
    const database = client.db("songxia");
    const movies = database.collection("user");
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: "Back to the Future" };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// 记录执行的时间
app.use(async (ctx, next) => {
  let stime = new Date().getTime();
  await next();
  let etime = new Date().getTime();
  ctx.response.type = "text/html";
  ctx.response.body = "<h1>Hello World</h1>";
  console.log(`请求地址: ${ctx.path}，响应时间：${etime - stime}ms`);
});

app.use(async (ctx, next) => {
  console.log("中间件1 doSomething");
  await next();
  console.log("中间件1 end");
});

app.use(async (ctx, next) => {
  console.log("中间件2 doSomething");
  await next();
  console.log("中间件2 end");
});

app.use(async (ctx, next) => {
  console.log("中间件3 doSomething");
  await next();
  console.log("中间件3 end");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
