const express = require('express')
const router = express.Router()

const brandController = require('../controllers/brand.controller')


const jwtAuthentication = require('../middlewares/jwtAuthentication');

router.route("/create").post(jwtAuthentication.verifyToken, brandController.createBrand)
router.route("/list").get(brandController.getBrand)
router.route("/update/:id").post(jwtAuthentication.verifyToken, brandController.updateBrand)
router.route("/delete/:id").delete(jwtAuthentication.verifyToken, brandController.deleteBrand)
module.exports = router