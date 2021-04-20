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
 const Operators = 
 Object.freeze(
   {
     and: Symbol.for('and'),
     or: Symbol.for('or'),
     eq: Symbol.for('eq'),
     ne: Symbol.for('ne')
   }
 )

const operatorsSet = new Set(Object.values(Operators))

/**
* Получаем все не вложенные операторы
* 
* @param {Object} obj - Объект описывающий SQL условие
* @returns {Array<symbol>} - Массив не вложенных операторов
* 
* @private
*/
const getOutOperators = (obj) => {
 return Object.getOwnPropertySymbols(obj).filter(s => operatorsSet.has(s));
}

/**
* Получаем все ключи включающие хоть какой-то оператор
* 
* @param {Object} obj - Объект описывающий SQL условие
* @returns {Array<string|symbol>} All keys including operators
* 
* @private
*/
function getComplexKeys(obj) {
 return getOperators(obj).concat(Object.keys(obj));
}

function MagicWhere() {
 // console.log(getOutOperators(sql));
 // console.log(getComplexKeys(sql));
}

/**
* Пример SQL условия
* 
*/
const sql = {
 a: {  
   [Operators.eq]: 2
 },
 b: {
   [Operators.or]: {
     [Operators.eq]: 21,
     [Operators.eq]: 11
   }
 },
 [Operators.or]: {
   c: 31,
   d: 53
 }
}

module.exports = MagicWhere