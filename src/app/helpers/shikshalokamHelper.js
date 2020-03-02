const request = require('request')
const envHelper = require('./environmentVariablesHelper.js')
const apiAuthToken = envHelper.PORTAL_API_AUTH_TOKEN
module.exports = {
  callAPI: function () {
    return function (req, res, next) {
      if (req.body && req.body.url && req.body.url != "") {
        var options = {
          method: req.body.method,
          url: req.body.url,
          headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'Bearer ' + apiAuthToken,
            'x-authenticated-user-token': req.kauth.grant.access_token.token,
            'x-authenticated-userId': req.kauth.grant.access_token.content.sub,
            'appName':'bodh'
          },
          body: req.body.body,
          json: true
        }
        if(req.body.headers && Object.keys(req.body.headers).length > 0) {
          Object.keys(req.body.headers).forEach(reqHeader => {
            if(!options[reqHeader]) options[reqHeader] = req.body.headers[reqHeader]
          })
        }
        request(options, function (error, response, body) {
          if(error) {
            const err = {
              id: new Date(),
              params: {
                resmsgid: new Date(),
                status: JSON.stringify(error.status),
                err: err,
                errmsg:error

              },
              responseCode: response.statusMessage,
              result: response.body,
              ts: new Date(),
              ver: "1",
            }
            res.send(err)
          } else {
            const obj = {
              id: new Date(),
              params: {
                resmsgid: new Date(),
                status: JSON.stringify(body.status),
                errmsg:response.body.message
              },
              responseCode: response.statusMessage,
              result: response.body,
              ts: new Date(),
              ver: "1",
            };
            res.status(response.statusCode)
            res.send(obj)
          }
          res.end()
        })
      } else {
        next()
      }
    }
  }
}