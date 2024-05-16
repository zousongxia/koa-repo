const { Model } = require("../mongo");
const UserSchema = {
  username: String,
  userPassword: {
    type: String, // 字段类型
    required: true, // 是否必填
  },
  userAccount: {
    type: String, // 字段类型
    required: true, // 是否必填
    unique: true, // 是否唯一
  },
  avatarUrl: {
    type: String,
    default:
      "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
  },
  gender: String,
  phone: String,
  email: String,
  userStatus: {
    type: Number, // 字段类型
    required: true, // 是否必填
    default: 0,
  },
  createTime: {
    type: Date, // 字段类型
    default: Date.now,
  },
  updateTime: {
    type: Date, // 字段类型
    default: Date.now,
  },
  isDelete: {
    type: Number, // 字段类型
    required: true, // 是否必填
    default: 0,
  },
  userRole: {
    type: Number, // 字段类型
    required: true, // 是否必填
    default: 0,
  },
};

const User = Model("user", UserSchema);
module.exports = User;
