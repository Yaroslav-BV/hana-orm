const _ = require('underscore')

const { selectTmp } = require('./queryTmp')

const find = require('./find')
const findOne = require('./findOne')

/** @class TableModel - Класс для создания модели таблицы */
class TableModel {
  /**
   * @param {string} table - Имя таблицы
   * @param {object} param - Параметры таблицы
   * @param {boolean} param.quotedName - Если true оборачивает имя таблицы в двойные кавычки
   */
  constructor(table, param = {}) {
    const { quotedName } = param

    if (!_.isString(table)) {
      throw Error('Invalid table name. table name is not String.')
    }

    /** 
     * @protected
     * @property {string} table - Имя таблицы
     */
    this._table = quotedName ? `"${table}"` : table

    /** @method find - Выборка данных из таблицы */
    this.find = find

    /** @method findOne - Выборка данных первого совпадения */
    this.findOne = findOne
  }

  /**
   * @protected
   * @method _getSelectStm - Возвращает заполненный SELECT шаблон
   * @param {object} p - Параметры для формирования стороки SELECT
   * 
   * @returns {string} - Возвращает сформированную строку SELECT
   */
  _getSelectStm(p) {
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
