/**
 * Символы операторов, которые будут использоваться в SQL условиях
 * 
 * @property and
 * @property or
 * @property eq
 * @property ne
 * 
 * @private
 */
 const Op = 
  Object.freeze(
    {
      and: Symbol.for('and'),
      or: Symbol.for('or'),
      eq: Symbol.for('eq'),
      ne: Symbol.for('ne'),
      gt: Symbol.for('gt'),
      gte: Symbol.for('gte'),
      lt: Symbol.for('lt'),
      lte: Symbol.for('lte'),
      in: Symbol.for('in')
    }
  )

module.exports = Op