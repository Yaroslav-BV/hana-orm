/**
 * @property {string} - Шаблон SELECT
 */

const queryTmp = {
  selectTmp:
    'SELECT <%= distinct %> <%= top %> <%= columns %> FROM <%= table %> <%= conditions %> <%= orderBy %>',
}

module.exports = queryTmp
