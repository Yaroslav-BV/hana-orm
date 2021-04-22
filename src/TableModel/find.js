const _ = require('lodash')
const { getType } = require('../util')

/**
 * @description Генерирует выборку SELECT и возвращет результат её выполнения в виде массива объектов
 * @param {Object} [p={}] Параметры для генерации SELECT
 * @param {boolean} [p.distinct] DISTINCT
 * @param {number} [p.top] TOP N ограничение
 * @param {Array<string>} [p.columns] Список полей для выборки
 * @param {string} [p.conditions] Условие WHERE
 * @param {Object<string, string>} [p.orderBy] Cортировка ORDER BY
 * @returns {Promise<Object[]>} Объект обещания вызова метода .exec()
 * @example
 * const result = User.find({
 *    distinct: true,
 *    top: 5,
 *    columns: ['id', 'first_name', 'last_name'],
 *    conditions: "WHERE id LIKE '3500%' AND age > 18",
 *    orderBy: {id: 'desc', age: 'asc'}
 * })
 */

const find = function (p = {}) {
  // Distinct
  if (!_.isUndefined(p.distinct) && !_.isBoolean(p.distinct))
    throw Error(`Parametr "distinct" is not Boolean type. Current type: ${getType(p.distinct)}`)
  const distinct = p.distinct ? 'DISTINCT' : null

  // Top
  if (!_.isUndefined(p.top) && !_.isNumber(p.top))
    throw Error(`Parametr "top" is not Number type. Current type: ${getType(p.top)}`)

  if (p.top < 1) throw Error('Parametr "top" must be greater number zero')
  const top = !_.isUndefined(p.top) ? `TOP ${p.top}` : null

  // Columns
  if (!_.isUndefined(p.columns) && !_.isArray(p.columns))
    throw Error(`Parametr "columns" is not Array type. Current type: ${getType(p.columns)}`)
  const columns = _.isUndefined(p.columns) ? '*' : this._transformCols(p.columns)

  // Conditions
  if (!_.isUndefined(p.conditions) && !_.isString(p.conditions))
    throw Error(`Parametr "conditions" is not Object type. Current type: ${getType(p.conditions)}`)

  // Order by
  if (!_.isUndefined(p.orderBy) && !_.isPlainObject(p.orderBy))
    throw Error(`Parametr "orderBy" is not Object type. Current type: ${getType(p.orderBy)}`)

  const orderBy = !_.isEmpty(p.orderBy)
    ? `ORDER BY ${Object.entries(p.orderBy)
        .map(([field, sortType]) => `${field} ${sortType.toUpperCase()}`)
        .join(', ')}`
    : null

  // Generate statment
  const selectStm = this._getSelectStm({
    distinct,
    top,
    columns,
    table: this._table,
    conditions: p.conditions,
    orderBy,
  })
    .replace(/\s+/g, ' ')
    .trim()

  return new Promise((resolve, reject) => {
    connect.exec(selectStm, null, function (err, rows) {
      if (err) {
        console.log('Query not executioned', selectStm)
        reject(err)
      } else {
        console.log('Query is executioned', selectStm)
        resolve(rows)
      }
    })
  })
}

module.exports = find
