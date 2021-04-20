/**
 * @description Генерирует выборку SELECT и возвращет результат первого совпадения её выполнения в виде объекта
 * @param {Object} [p={}] Параметры для генерации SELECT
 * @param {boolean} [p.distinct] DISTINCT
 * @param {Array<string>} [p.columns] Список полей для выборки
 * @param {string} [p.conditions] Условие WHERE
 * @param {Object<string, string>} [p.orderBy] Cортировка ORDER BY
 * @default p.top = 1 // Добавить TOP 1 ограничение
 * @returns {Promise<Object[]>} Объект обещания вызова метода .exec()
 * @example
 * const result = User.findOne({
 *    distinct: true,
 *    columns: ['id', 'first_name', 'last_name'],
 *    conditions: {},
 *    orderBy: {id: 'desc', age: 'asc'}
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
