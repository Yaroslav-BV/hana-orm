const Op = require('./operators')

const OpMap = 
 Object.freeze(
   {
     [Op.and]: ' AND ',
     [Op.or]: ' OR ',
     [Op.eq]: '=',
     [Op.ne]: '!=',
     [Op.in]: ' IN '
   }
 )

 module.exports = OpMap