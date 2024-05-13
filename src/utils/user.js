const getSafetyUser = (user) => {
  if (!user) return null;
  return {
    id: user._id,
    username: user.username,
    userAccount: user.userAccount,
    avatarUrl: user.avatarUrl,
    gender: user.gender,
    phone: user.phone,
    email: user.email,
    userStatus: user.userStatus,
    createTime: user.createTime,
    userRole: user.userRole,
  };
};
module.exports = { getSafetyUser };
