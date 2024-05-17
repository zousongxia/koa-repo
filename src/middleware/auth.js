const { SECRET_KEY } = require("../utils/constant");
const jwt = require("jsonwebtoken");

module.exports = async (ctx, next) => {
  // 如果请求路径是登录接口，则跳过JWT验证
  if (ctx.path === "/api/user/login" || ctx.path === "/api/user/register") {
    await next();
    return;
  }

  // 从请求头中获取 JWT
  const { authorization } = ctx.request.headers;

  // 如果没有提供 JWT，则返回 401 Unauthorized
  if (!authorization) {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: "Authorization token is required",
      data: null,
    };
    return;
  }

  try {
    const token = authorization.split(" ")[1];
    // 验证并解码 JWT
    const currentUser = jwt.verify(token, SECRET_KEY);

    // 将解码后的信息存储在上下文中以供后续中间件使用
    ctx.state.id = currentUser.id;

    // 继续执行下一个中间件
    await next();
  } catch (error) {
    // 如果 JWT 无效，返回 401 Unauthorized
    ctx.status = 401;
    ctx.body = { success: false, message: "Invalid token", data: null };
  }
};
