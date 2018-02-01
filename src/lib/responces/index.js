module.exports = {
  // resGood(ctx, statusCode, body) {},
  Error(ctx, statusCode, massage) {
    ctx.status = statusCode;
    ctx.body = { statusCode, error: massage };
  },
};
