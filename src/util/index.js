const getType = (value) =>
  Object.prototype.toString.call(value).split(' ')[1].slice(0, -1)

module.exports = {
  getType,
}
