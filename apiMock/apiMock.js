'use strict'
const path = require('path');
module.exports = dir => {
  const apiIndex = path.join(dir, 'index.js');
  return (app) => {
    const handler = (dirSplit) => {
      return (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let apiHandle = require(apiIndex);
        let resData = '';
        if (typeof apiHandle === 'function') {
          resData = apiHandle(req);
        }
        if (!resData) {
          let queryStr = req.originalUrl.split(dirSplit);
          let fileNameStr = queryStr.length === 2 ? queryStr[1].split('?')[0] : '';
          if (fileNameStr) {
            let fileDir = path.join(dir, dirSplit, fileNameStr + '.json');
            setTimeout(() => {
              res.sendFile(fileDir, function (err) {
                if (err) {
                  res.status(err.status).end();
                }
              });
            }, 2000*Math.random());
          }
        } else {
          res.send(resData);
        }
      }
    }
    app.use('/admin/*', handler('/admin/'))
    app.use('/v2/*', handler('/v2/'))
    app.use('/common/*', handler('/common/'))
    app.use('/api/*', handler('/api/'))
    app.use('/local/*', handler('/local/'))
    app.get('/getapiconfig.js', handler())
  }
}
