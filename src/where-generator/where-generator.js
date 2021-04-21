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

  return items.reverse().join(' AND ')
}

function whereItem(key, value) {

  if(key === Op.and || key === Op.or) {
    return whereGrouping(key, value)
  }

  return Helpers.joinKeyValue(key, value, OpMap[Op.eq])
}

function whereGrouping(key, value) {
  const op = key === Op.and ? OpMap[Op.and] : OpMap[Op.or]

  if(Array.isArray(value)) {
    value = value.map(item => {
      return whereItems(item)
    })

    value = value.join(op);
  } else {
    throw new Error('Operator and/or supported only <array> for value')
  }

  return value
}

function getConditions(where) {
  if(!Helpers.isObject(where)) throw new Error('Supported only <object>')
  
  return whereItems(
    {
      a: 1,
      [Op.or]: [
        {b: 2},
        {c: 3}
      ]
    }
  ) || '1=1'
}

module.exports = getConditions