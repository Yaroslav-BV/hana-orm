/**
 * @description Генерирует выборку SELECT и возвращет результат первого совпадения её выполнения в виде объекта
 *
 * @param {object} p - Параметры для генерации SELECT
 * @param {boolean} p.distinct - Добавить DISTINCT
 * @param {array} p.columns - Список полей для выборки
 * @param {object} p.conditions - Добавить условие WHERE
 * @param {object} p.orderBy - Добавить сортировку ORDER BY
 *
 * @default {number} p.top = 1 - Добавить TOP 1 ограничение
 * 
 * @returns {Promise} - Объект обещания вызова метода .exec()
 *
 * @example
 * const result = User.findOne({
 *  distinct: true,
 *  columns: ['id', 'first_name', 'last_name'],
 *  conditions: {},
 *  orderBy: {id: 'desc', age: 'asc'}
 * })
 */

const findOne = function (p = {}) {
  return new Promise((resolve, reject) => {
    this.find({ ...p, top: 1 })
      .then((rows) => resolve(rows[0]))
      .catch((err) => reject(err))
  })
}

module.exports = findOne
