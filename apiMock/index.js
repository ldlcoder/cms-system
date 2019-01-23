'use strict'
const path = require('path')
const fs = require('fs')
module.exports = (request) => {
  const { originalUrl } = request
  switch (originalUrl) {
    case '/getapiconfig.js':
      const apiConfigDir = path.join(__dirname, 'apiConfig.js')
      return fs.readFileSync(apiConfigDir, 'utf-8')
    case '/main/getMenuInfo':
      const menuInfoDir = path.join(__dirname, 'getMenuInfo.js')
      return fs.readFileSync(menuInfoDir, 'utf-8')
  }
}
