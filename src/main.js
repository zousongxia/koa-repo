const mongo = require("./mongo");

mongo
  .tryConnect()
  .then(() => {
    require("./server");
  })
  .catch((err) => {
    console.log("err", err);
  });
