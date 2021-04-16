const express = require('express')
const xsenv = require('@sap/xsenv')
const { hanaMiddleware, TableModel } = require('../index') // require hana-orm

const app = express()
const port = process.env.PORT || 4000

const services = xsenv.getServices({ hana: { tag: 'hana' } }) // get hana parametrs for connect

/* Or manual data for connecting
  const hanaService = {
    port: '',
    host: '',
    user: '',
    password: '',
    currentSchema: '' 
  }
*/

app.use(hanaMiddleware(services.hana)) // added middleware

app.get('/user-data', async (req, res) => {
  const User = new TableModel('users', { doubleQuotes: true }) // create user table model with quoted name

  try {
    const userData = await User.findOne({
      attributes: ['id', 'first_name', 'last_name', 'age'],
      where: { id: '35001122' },
    }) // send SELECT id, first_name, last_name, age FROM "users" WHERE id = '35001122' and return result

    res.status(200).json(userData[0])
  } catch (error) {
    console.log('Error request user data: ', error)
    res.status(400).json({ message: 'User data request is failed' })
  }
})

app.listen(port, () =>
  console.log(`Server working on http://localhost:${port}/`)
)
