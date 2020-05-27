module.exports = function (app, options) {
  return (req, res, next) => {
    if (
      req.session.user && req.session.user.userId
    ) {
      next()
    } else if (req.path.indexOf('/api') >= 0) {
      res.send({ status: -10000, message: 'login overtime' })
    } else if (req.path.indexOf('/login') < 0) {
      const redirectUrl = '?redirectUrl=' + encodeURIComponent(req.originalUrl)
      const url = `/permissions/login${redirectUrl}`
      res.redirect(url)
    } else {
      next()
    }
  }
}
