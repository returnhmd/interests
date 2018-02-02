module.exports = (ctx, next) => {
  if (!ctx.state.user) {
    ctx.throw(401);
  }
  return next();
};
