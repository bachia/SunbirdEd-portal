const proxyUtils = require('../proxy/proxyUtils.js')
const permissionsHelper = require('../helpers/permissionsHelper.js')
const shikshalokamHelper = require('../helpers/shikshalokamHelper.js')
const bodyParser = require('body-parser')
module.exports = (app) => {
    app.all('/shikshalokam/*',
        proxyUtils.verifyToken(),
        permissionsHelper.checkPermission(),
        bodyParser.urlencoded({ extended: false }),
        bodyParser.json({ limit: '10mb' }),
        shikshalokamHelper.callAPI()
    )
}