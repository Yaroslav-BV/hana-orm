const connection = require('./src/connection')
const TableModel = require('./src/models/TableModel')
const hanaMiddleware = require('./src/hanaMiddleware')

module.exports = {
  connection,
  hanaMiddleware,
  TableModel,
}
