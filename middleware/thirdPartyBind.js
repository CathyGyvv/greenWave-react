const axios = require('axios')

module.exports = function (app, options) {
  return async (req, res, next) => {
    const url = `/permissions/api/checkAliyunId`
    const method = 'GET'

    try {
      const response = await axios({
        url,
        method,
        headers: {'X-Access-UserId': req.session.user.aliyunID}
      })
      if (response.data.status !== 0) {
        const url = `/permissions/forbidden`
        res.redirect(url)
      } else {
        next()
      }
    } catch (err) {
      console.log('fetch /permissions/api/checkAliyunId error. ', err)
      setTimeout(() => {
        const url = `/permissions/forbidden`
        res.redirect(url)
      }, 3000)
    }
  }
}
