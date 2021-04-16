const hana = require('@sap/hana-client')
const hanaConnection = hana.createConnection()

const connect = (params) => {
  return new Promise((resolve, reject) => {
    hanaConnection.connect(params, function (err) {
      if (err) {
        reject(err)
      } else {
        console.log(
          `Connected to hana db. Schema name: ${params.currentSchema}.`
        )
        global.connect = hanaConnection
        resolve(hanaConnection)
      }
    })
  })
}

const disconnect = () => {
  return new Promise((resolve, reject) => {
    hanaConnection.disconnect(function (err) {
      if (err) {
        reject(err)
      } else {
        delete global.connect
        console.log('Disconnected from hana db.')
        resolve()
      }
    })
  })
}

module.exports = {
  connect,
  disconnect,
}
