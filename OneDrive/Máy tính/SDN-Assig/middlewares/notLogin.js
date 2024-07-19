module.exports = (req, res, next) => {
  if (req.session.memberId) {
    return res.redirect("/");
  }
  next();
};
