const Op = require('./operators')
const OpMap = require('./operatorsMap')
const Helpers = require('./helpers')

const opSet = new Set(Object.values(Op))

function getOps(smthObj) {
  return Object.getOwnPropertySymbols(smthObj)
    .filter(prop => opSet.has(prop))
}

function getMixedKeys(smthObj) {
  return getOps(smthObj).concat(Object.keys(smthObj))
}

function getWhere(where, op) {
  const whereKeys = getMixedKeys(where)
  const items = []
  if(!whereKeys.length) return

  whereKeys.forEach(prop => {
    const item = where[prop]
    items.push(getWhereItem(prop, item))
  })

  return items.reverse().join(op || ' AND ')
}

function getWhereItem(key, value) {
  if(key === Op.and || key === Op.or) {
    if(Array.isArray(value)) {
      return value
        .map(item => getWhere(item, OpMap[key]))
        .filter(item => item && item.length)
        .join(OpMap[key])
    } else {
      throw new Error('Key [Op.and] || [Op.or] only support <object> as value')
    }
  }

  return Helpers.joinKeyValue(key, value, OpMap[Op.eq])
}

function getConditions(smthObj) {
  if(!Helpers.isObject(smthObj)) throw new Error('Supported only <object>')
  
  return getWhere(obj) || '1=1'
}

const obj = {
  a: 1,
  [Op.or]: [
    {b: 2},
    {c: 3},
    {
      [Op.and]: [
        {d: 12},
        {f: 2}
      ]
    }
  ]
}

module.exports = getConditions