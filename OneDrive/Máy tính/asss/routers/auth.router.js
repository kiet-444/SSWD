const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");
const admin = require("../middlewares/verify");
const passport = require("passport");
const notLogin = require("../middlewares/notLogin");
const isLogin = require("../middlewares/isLogin");

// router.get("/login", (req, res) => {
//     res.render("auth/login.ejs") // phải thêm auth chứ ko bên index.js mình định nghĩa app.set("views", "views"); nó ko hiểu
// })

router.get("/register", notLogin, AuthController.renderRegisterPage);
router.post("/register", AuthController.register);
router.get("/register-success", AuthController.registerSuccess);

router.get("/login", notLogin, AuthController.renderLoginPage);
router.post("/login", AuthController.login);
router.get("/admin", admin, AuthController.renderAdminPage);
// router.get("/login-success", AuthController.loginSuccess)

router.get("/logout", AuthController.logout);

router.get("/profile", isLogin, AuthController.getProfile);

router.post("/profile", isLogin, AuthController.updateProfile);

router.post("/profile/change-password", isLogin, AuthController.changePassword);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/login",
  })
);
router.get("/auth/google/success", AuthController.googleSuccess);

module.exports = router;
