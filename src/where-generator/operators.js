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
      in: Symbol.for('in')
    }
  )

module.exports = Op