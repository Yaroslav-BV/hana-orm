const _ = require('underscore')

class TableModel {
  constructor(table, setting = {}) {
    const { doubleQuotes } = setting

    if (_.isUndefined(table) || _.isEmpty(table.trim()))
      throw Error(
        'Table model create failed. Table name is undefined or is empty'
      )

    this.table = doubleQuotes ? `"${table}"` : table
    this._sqlSelectTmp =
      'SELECT <%= columns %> FROM <%= table %> <%= conditions %>'
  }

  set sqlSelectTmp(value) {
    // * Сбрасываем шаблон если initial
    if (value === 'initial')
      return (this._sqlSelectTmp =
        'SELECT <%= columns %> FROM <%= table %> <%= conditions %>')
    this._sqlSelectTmp = value
  }

  get sqlSelectTmp() {
    return this._sqlSelectTmp
  }

  find(param = {}) {
    const { attributes, where } = param

    // * Если атрибуты есть, но не массив, то выводить ошибку
    if (attributes && !_.isArray(attributes))
      throw Error('The attribute list must be an array')

    // * Если атрибуты это пустой массив или undefined, то '*', иначе преобразуем массив в строку
    const columns = !_.isEmpty(attributes) ? attributes : '*'

    // * Если есть условие и оно массив или функия или не объект, то выводить ошибку
    if (
      where &&
      (_.isArray(where) || _.isFunction(where) || !_.isObject(where))
    )
      throw Error(
        `The conditions list must be an object. Condition received value: ${where}, type: ${Object.prototype.toString.call(
          where
        )}`
      )

    // * Если условие это пустой объект или undefined, то '', иначе собираем строку с условием AND
    const condFields = !_.isEmpty(where)
      ? `WHERE ${Object.keys(where).join(' = ? AND ')} = ?`
      : ''

    // * Преобразуем значения условия в массив
    const condValues = !_.isEmpty(where) ? Object.values(where) : []

    // * Заполняем шаблон для SQL SELECT
    const selectStm = _.template(this.sqlSelectTmp)({
      columns: columns,
      table: this.table,
      conditions: condFields,
    })
    this.sqlSelectTmp = 'initial'

    return new Promise((resolve, reject) => {
      connect.exec(selectStm, condValues, function (err, rows) {
        if (err) {
          console.log('Запрос не выполнен', selectStm)
          reject(err)
        } else {
          console.log('Запрос выполнен', selectStm)
          resolve(rows)
        }
      })
    })
  }

  findOne(param = {}) {
    this.sqlSelectTmp =
      'SELECT TOP 1 <%= columns %> FROM <%= table %> <%= conditions %>'
    return this.find(param)
  }
}

module.exports = TableModel
