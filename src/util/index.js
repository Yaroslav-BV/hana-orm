/**
 * @function getType Получить название типа переданного значения в виде строки
 * @param {*} value Значения для анализа его типа 
 * @returns {string} Возвращает имя класса от которого было создано значение
 */

const getType = (value) =>
  Object.prototype.toString.call(value).split(' ')[1].slice(0, -1)

module.exports = {
  getType,
}
