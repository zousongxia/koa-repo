const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/songxia";

const tryConnect = () => {
  return mongoose.connect(DB_URL);
};

const Model = (name, schema) => {
  const Schema = new mongoose.Schema(schema, {
    collection: name,
  });

  // 在保存之前设置 updateTime
  Schema.pre("save", function (next) {
    if (this.isModified()) {
      // 如果文档被修改
      this.updateTime = new Date(); // 更新 updateTime
    }
    next();
  });

  return mongoose.model(name, Schema);
};

/** 连接成功 */
mongoose.connection.on("connected", function () {
  console.log("Mongoose connection open to " + DB_URL);
});
/** 连接异常 */
mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error:" + err);
});
/** 连接断开 */
mongoose.connection.on("disconnectied", function () {
  console.log("Mongoose connection disconnected");
});

module.exports = {
  Model,
  tryConnect,
};
