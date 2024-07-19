const express = require('express')
const router = express.Router()

const watchController = require('../controllers/watch.controller')


const jwtAuthentication = require('../middlewares/jwtAuthentication');

router.route("/create").post(jwtAuthentication.verifyToken, watchController.createWatch)
router.route("/list").get(watchController.getWatch)
router.route("/detail/:id").get(watchController.getWatchById)
module.exports = router