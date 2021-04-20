const _ = require('underscore')

const { selectTmp } = require('./queryTmp')

const find = require('./find')
const findOne = require('./findOne')

/** @class TableModel Класс для создания модели таблицы */
class TableModel {
  /**
   * @param {string} table Имя таблицы
   * @param {Object} [param={}] Параметры таблицы
   * @param {boolean} [param.quotedName] Если true оборачивает имя таблицы в двойные кавычки
   */
  constructor(table, param = {}) {
    const { quotedName } = param

    if (!_.isString(table)) {
      throw Error('Invalid table name. table name is not String.')
    }

    /**
     * @protected
     * @property {string} table Имя таблицы
     */
    this._table = quotedName ? `"${table}"` : table

    /** @method find Выборка данных из таблицы */
    this.find = find

    /** @method findOne Выборка данных по первому совпадению */
    this.findOne = findOne
  }

  /**
   * @protected
   * @method _getSelectStm Возвращает заполненный SELECT шаблон
   * @param {Object} p Параметры для формирования строки SELECT
   * @returns {string} Возвращает сформированную строку SELECT
   */
  _getSelectStm(p) {
    for (const key in p) {
      if (!_.isUndefined(p[key]) && !_.isNull(p[key]) && !_.isString(p[key]))
        throw Error(`Value from prop "${key}" is not String.`)
    }

    const selectStm = _.template(selectTmp)({ ...p })

    return selectStm
  }
}

module.exports = TableModel
