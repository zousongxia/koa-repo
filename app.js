const Koa = require("koa");
const app = new Koa();
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/songxia";
const client = new MongoClient(url);

async function run() {
  try {
    const database = client.db("songxia");
    const movies = database.collection("user");
    // Query for a movie that has the title 'Back to the Future'
    const query = { username: "songxia" };
    const movie = await movies.findOne(query);
    console.log("movie", movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run()

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
