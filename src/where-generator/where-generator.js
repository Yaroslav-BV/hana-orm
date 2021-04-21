const Op = require('./operators')
const OpMap = require('./operatorsMap')
const Helpers = require('./helpers')

const opSet = new Set(Object.values(Op))

function getOps(obj) {
  return Object.getOwnPropertySymbols(obj)
    .filter(prop => opSet.has(prop))
}

function getComplexKeys(obj) {
  return getOps(obj).concat(Object.keys(obj))
}

function whereItems(where) {
  const whereComplexKeys = getComplexKeys(where)
  const items = []
  if(!whereComplexKeys.length) return

  whereComplexKeys.forEach(prop => {
    const item = where[prop]
    items.push(whereItem(prop, item))
  })

  return items.join(' AND ')
}

function whereItem(key, value) {
  return Helpers.joinKeyValue(key, value, OpMap[Op.eq])
}

function getConditions(where) {
  if(!Helpers.isObject(where)) throw new Error('Supported only <object>')
  
  return whereItems(
    {
      a: 1,
      b: 2
    }
  ) || '1=1'
}

module.exports = getConditions