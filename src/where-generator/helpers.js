const _ = require('underscore')

function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

const Helpers = {
  isObject: (smth) => {
    if(!_.isObject(smth)) return false
    if(Object.getPrototypeOf(smth) === null) return true

    let proto = smth
    
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto)
    }

    return Object.getPrototypeOf(smth) === proto
  },

  joinKeyValue: (key, value, op) => {
    return [
      key, 
      !isNumber(value) ? `'${value}'` : value 
    ].join(` ${op} `)
  }
}

module.exports = Helpers