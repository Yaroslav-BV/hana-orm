const Op = require('./operators')
const OpMap = require('./operatorsMap')
const Helpers = require('./helpers')

const opSet = new Set(Object.values(Op))
/**
 * Получаем все символьные свойства в каком-то объекте
 * @param {<object>}} smthObj 
 * @returns {<array>} массив символьных свойств какого-то объекта
 */
function getOps(smthObj) {
  return Object.getOwnPropertySymbols(smthObj)
    .filter(prop => opSet.has(prop))
}
/**
 * Получаем все свойства из какого-то объекта включая символьные
 * @param {<object>} smthObj 
 * @returns {<array>} массив всех свойств какого-то объекта
 */
function getKeys(smthObj) {
  return getOps(smthObj).concat(Object.keys(smthObj))
}
/**
 * Получаем строку условий из переданного объекта с любым
 * колличеством свойств
 * @param {<object>} where 
 * @param {<String>} op
 * @returns {<String>} строка условий
 */
function getWhere(where, op) {
  const whereKeys = getKeys(where)
  const items = []
  if (!whereKeys.length) return

  whereKeys.forEach(prop => {
    const item = where[prop]
    items.push(getWhereItem(prop, item))
  })

  return items.join(op || ' AND ')
}
/**
 * Генерируем условие переданных параметров
 * @param {<String><Simbol>} key 
 * @param {*} value 
 * @returns {<String>} строка условия
 */
function getWhereItem(key, value) {
  if (key === undefined) throw new Error(`${key} is "undefined"`)
  if (value === undefined) throw new Error(`${key} has "undefined" value`)

  const valueIsObject = Helpers.isObject(value)
  const valueIsArray = !valueIsObject && Array.isArray(value)
  const valueKeys = valueIsObject && getKeys(value)

  if (key === Op.and || key === Op.or) {
    if (!valueIsArray) throw new Error('Key [Op.and] || [Op.or] only support <array> as value')
    /**
     * Т.к значение операторов and и or всегда массив,
     * значения этого массива обрабатываем в рекурсивном вызове
     * getWhere
     */
    return value
      .map(obj => getWhere(obj, OpMap[key]))
      .filter(item => item && item.length)
      .join(OpMap[key])
  }

  if (valueIsObject) {
    if (valueKeys.length > 1) {
      /**
       * Если значение key является объект,
       * и содержит больше одного свойства, то
       * рекурсивный вызов getWhereItem
       */
      return valueKeys
        .map(prop => getWhereItem(key, { [prop]:value[prop] }))
        .filter(item => item && item.length)
        .join(OpMap[Op.and])
    }
    if (!OpMap[valueKeys[0]]) throw new Error(`Invalid value key`)

    return Helpers.joinKeyValue(key, value[valueKeys[0]], OpMap[valueKeys[0]])
  }

  return Helpers.joinKeyValue(key, value, OpMap[Op.eq])
}
/**
 * Точка входа, принимает только объект
 * @param {<object>} smthObj 
 * @returns {<string>} конечная строка WHERE
 */
function getConditions(smthObj) {
  if (!Helpers.isObject(smthObj)) throw new Error('Supported only <object>')
  const where = getWhere(obj)
  
  if (where && where.length) {
    return `WHERE ${where}`
  }
  
  return ''
}

const obj = {
  [Op.or]: [
    {a: 1},
    {c: 3}
  ],
  [Op.and]: [
    {b: 4}
  ]
}

module.exports = getConditions