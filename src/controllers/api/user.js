const KoaRouter = require("koa-router");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const { SECRET_KEY } = require("../../utils/constant");
const { getSafetyUser } = require("../../utils/user");

const router = new KoaRouter({
  prefix: "/user",
});

router.get("/search", async (ctx) => {
  const { userAccount } = ctx.state;
  const user = await User.findOne({ userAccount }).select(
    "-userPassword -isDelete"
  );
  ctx.body = {
    success: true,
    data: user,
  };
});
router.post("/delete", async (ctx) => {
  const { userId } = ctx.state;
  const result = await User.deleteOne(userId);
  ctx.body = {
    success: result,
  };
});

router.get("/current", async (ctx) => {
  const { id } = ctx.state;
  const user = await User.findById(id);
  ctx.body = {
    success: true,
    data: getSafetyUser(user),
  };
});

router.post("/register", async (ctx) => {
  const { userAccount, userPassword, checkPassword } = ctx.request.body;
  if (!userAccount || !userPassword || !checkPassword) {
    ctx.body = {
      success: false,
      message: "账号和密码不能为空",
      data: null,
    };
    return;
  }
  if (!userAccount.match(/^[a-zA-Z0-9_]+$/)) {
    ctx.body = {
      success: false,
      message: "账号只能包含数字、字母和下划线",
      data: null,
    };
    return;
  }
  if (userPassword.length < 8) {
    ctx.body = {
      success: false,
      message: "密码不能少于8位",
      data: null,
    };
    return;
  }
  if (userPassword !== checkPassword) {
    ctx.body = {
      success: false,
      message: "两次密码不一致",
      data: null,
    };
    return;
  }
  const user = await User.findOne({ userAccount });
  if (user) {
    ctx.body = {
      success: false,
      message: "账户已存在",
      data: null,
    };
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const encryptPassword = bcrypt.hashSync(userPassword, salt);
  const newUser = new User({
    userAccount,
    userPassword: encryptPassword,
  });
  await newUser.save();
  ctx.body = {
    success: true,
    data: newUser._id,
  };
});

router.post("/login", async (ctx) => {
  const { userAccount, userPassword } = ctx.request.body;
  if (!userAccount || !userPassword) {
    ctx.body = {
      success: false,
      message: "账号和密码不能为空",
      data: null,
    };
    return;
  }
  if (userPassword.length < 8) {
    ctx.body = {
      success: false,
      message: "密码不能少于8位",
      data: null,
    };
    return;
  }
  if (!userAccount.match(/^[a-zA-Z0-9_]+$/)) {
    ctx.body = {
      success: false,
      message: "账号只能包含数字、字母和下划线",
      data: null,
    };
    return;
  }
  // const user = await User.findOne({ userAccount, userPassword });
  const user = await User.findOne({ userAccount });
  // 如果用户不存在或密码不匹配，返回错误信息
  if (!user) {
    ctx.body = {
      success: false,
      message: "账号或密码错误",
      data: null,
    };
    return;
  }
  const bcryptPassword = user.userPassword;
  const isValid = bcrypt.compareSync(userPassword, bcryptPassword);

  if (!isValid) {
    ctx.body = {
      success: false,
      message: "账号或密码错误",
      data: null,
    };
    return;
  }

  const userInfo = {
    id: user._id,
    userAccount: user.userAccount,
  };

  // 登录成功，返回 token
  const token = jwt.sign(userInfo, SECRET_KEY, { expiresIn: "2h" });
  ctx.body = {
    success: true,
    data: {
      token,
      ...userInfo,
    },
  };
});

module.exports = router;
