const { Model } = require("../mongo");
const UserSchema = {
  username: {
    type: String, // 字段类型
    required: true, // 是否必填
    unique: true, // 是否唯一
  },
  userPassword: {
    type: String, // 字段类型
    required: true, // 是否必填
  },
  userAccount: String,
  avatarUrl: String,
  gender: String,
  phone: String,
  email: String,
  userStatus: {
    type: Number, // 字段类型
    required: true, // 是否必填
  },
  createTime: Date,
  updateTime: Date,
  isDelete: {
    type: Number, // 字段类型
    required: true, // 是否必填
  },
  userRole: {
    type: Number, // 字段类型
    required: true, // 是否必填
  },
};
const User = Model("user", UserSchema);
module.exports = User;
