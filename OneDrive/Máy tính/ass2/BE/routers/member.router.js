const express = require('express')
const router = express.Router()

const MemberController = require("../controllers/member.controller")
const jwtAuthentication = require('../middlewares/jwtAuthentication');

router.route("/getMembers").get(jwtAuthentication.verifyToken, MemberController.getMembers)

module.exports = router