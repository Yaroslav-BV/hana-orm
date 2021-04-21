const _ = require('underscore')
const { getType } = require('../util')

/**
 * @description Генерирует вставку INSERT и возвращет результат вставки в виде массива объектов
 * @param {Object} data Данные для вставки в таблицу в виде объекта, где свойства объекта равны названиям полей таблицы
 * @returns {Promise<Object[]>} Объект обещания вызова метода .exec()
 * @example
 * const result = User.create({
 *    id: '35000001',
 *    first_name: 'Иван',
 *    last_name: 'Иванов',
 *    age: 20
 * })
 */

const create = function (data) {
  if (_.isUndefined(data) || _.isEmpty(data))
    throw Error('Parametr "data" is empty. For create record in table must be not empty object')
  if (!_.isObject(data) || _.isArray(data) || _.isFunction(data))
    throw Error(`Parametr "data" is not Object type. Current type: ${getType(data)}`)

  const columns = _.keys(data).join(', ')
  const values = _.values(data)
  const valuesMask = '?, '.repeat(values.length).slice(0, -2)

  const insertStm = this._getInsertStm({
    table: this._table,
    columns,
    valuesMask,
  })

  return new Promise((resolve, reject) => {
    connect.exec(insertStm, values, function (err, rows) {
      if (err) {
        console.log('Query not executioned', insertStm)
        reject(err)
      } else {
        console.log('Query is executioned', insertStm)
        resolve(rows)
      }
    })
  })
}

module.exports = create
