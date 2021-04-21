/**
 * @property {string} шаблоны sql
 */

const queryTmp = {
  selectTmp:
    'SELECT <%= distinct %> <%= top %> <%= columns %> FROM <%= table %> <%= conditions %> <%= orderBy %>',
  insertTmp: 'INSERT INTO <%= table %> (<%= columns %>) VALUES (<%= values =>)',
  udpateTmp: 'UPDATE <%= table %> SET <%= set => <%= conditions %>',
  deleteTmp: 'DELETE FROM <%= table %> <%= conditions %>',
}

module.exports = queryTmp
