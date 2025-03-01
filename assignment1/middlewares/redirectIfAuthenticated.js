module.exports = (req, res, next) => {
  if (req.session.token) {
    return res.redirect('/dashboard') // Nếu đã có token trong cookie, redirect về dashboard
  }
  next()
}
