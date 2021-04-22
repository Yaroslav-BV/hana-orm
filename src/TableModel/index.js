const _ = require('lodash')

const { selectTmp, insertTmp } = require('./queryTmp')

const find = require('./find')
const findOne = require('./findOne')
const create = require('./create')

/** @class TableModel Класс для создания модели таблицы */
class TableModel {
  /**
   * @param {string} table Имя таблицы
   * @param {Object} [param={}] Параметры таблицы
   * @param {boolean} [param.quotedName=false] Если true оборачивает имя таблицы в двойные кавычки
   * @param {boolean} [param.colQuoteWrap=false] Если true оборачивает каждое имя поля таблицы в двойные кавычки
   * @param {boolean} [param.colUpperCaseName=false] Если true делает каждое имя поля таблицы в верхнем регистре
   */
  constructor(table, param = {}) {
    const { quotedName, colQuoteWrap, colUpperCaseName } = param

    if (!_.isString(table)) {
      throw Error('Invalid table name. table name is not String.')
    }

    /**
     * @protected
     * @property {boolean} [_quotedName=false] Флаг. Обернуть имя таблицы в двойные кавычки
     */
    this._quotedName = quotedName || false
    /**
     * @protected
     * @property {boolean} [_colQuoteWrap=false] Флаг. Обернуть каждое имя поля таблицы в кавычки
     */
    this._colQuoteWrap = colQuoteWrap || false
    /**
     * @protected
     * @property {boolean} [_colUpperCaseName=false] Флаг. Сделать каждое имя поля таблицы в верхнем регистре
     */
    this._colUpperCaseName = colUpperCaseName || false

    /**
     * @protected
     * @property {string} _table Имя таблицы
     */
    this._table = this._quotedName ? `"${table}"` : table

    /** @method find Выборка данных из таблицы */
    this.find = find

    /** @method findOne Выборка данных по первому совпадению */
    this.findOne = findOne

    /** @method create Создаёт новую запись в таблице */
    this.create = create
  }

  /**
   * @protected
   * @method _transformCols Трансформирует поля таблицы исходя из дополнительных параметров для полей
   * @param {Array<string>} cols Массив строк с именами полей
   * @returns {string} Возвращает трансформированную строку названий полей исходя из параметров модели
   */
  _transformCols(cols) {
    let transformedCols = cols

    if (this._colQuoteWrap) transformedCols = transformedCols.map((col) => `"${col}"`)
    if (this._colUpperCaseName) transformedCols = transformedCols.map((col) => col.toUpperCase())

    return transformedCols.join(', ')
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

    return _.template(selectTmp)({ ...p })
  }

  /**
   * @protected
   * @method _getInsertStm Возвращает заполненный INSERT шаблон
   * @param {Object} p Параметры для формирования строки INSERT
   * @returns {string} Возвращает сформированную строку INSERT
   */
  _getInsertStm(p) {
    return _.template(insertTmp)({ ...p })
  }
}

module.exports = TableModel
