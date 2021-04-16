const connection = require('./connection')

const hanaMiddleware = (params) => {
  return async (req, res, next) => {
    try {
      await connection.connect(params)

      const end = res.end
      res.end = async function () {
        try {
          const resEndArgs = arguments
          await connection.disconnect()
          res.end = end
          res.end.apply(res, resEndArgs)
        } catch (err) {
          console.log(err)
        }
      }

      next()
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = hanaMiddleware
