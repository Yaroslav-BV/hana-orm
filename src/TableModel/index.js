const _ = require('underscore')

const { selectTmp } = require('./queryTmp')

const find = require('./find')
const findOne = require('./findOne')

class TableModel {
  constructor(table, param = {}) {
    const { quotedName } = param

    if (!_.isString(table)) {
      throw Error('Invalid table name. table name is not String.')
    }

    // Table parametrs
    this.table = quotedName ? `"${table}"` : table

    // Table query methods
    this.find = find
    this.findOne = findOne
  }

  getSelectStm(p) {
    for (const key in p) {
      if (!_.isUndefined(p[key]) && !_.isNull(p[key]) && !_.isString(p[key]))
        throw Error(`Value from prop "${key}" is not String.`)
    }

    const selectStm = _.template(selectTmp)({
      distinct: p.distinct,
      top: p.top,
      columns: p.columns,
      table: p.table,
      conditions: p.conditions,
      orderBy: p.orderBy,
    })

    return selectStm
  }
}

module.exports = TableModel
