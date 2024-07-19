const MemberModel = require("../models/member.model");
const bcrypt = require("bcrypt");
const { log } = require("console");
const url = require("url");

module.exports = {
  register: async (req, res) => {
    const bodyData = req.body;
    // console.log(bodyData);
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(bodyData.password, salt);
      const exitedMember = await MemberModel.findOne({
        memberName: bodyData.memberName,
      }); // tìm bất cứ cái field nào của phần tử
      // console.log(bodyData.password.length)
      // if (bodyData.password.length < 8) {
      //     return next(createError(res, 403, "Vui lòng nhập mật khẩu có 8 kí tự")) // check mật khẩu có đủ 8 kí tự hay ko
      // }
      if (exitedMember) {
        return res.render("auth/register", {
          errorMessage: "Tên này đã tồn tại",
        });
      }
      const newMember = await MemberModel.create({
        ...bodyData,
        password: hashPassword,
      });
      res.redirect(
        url.format({
          pathname: "/register-success",
          query: {
            memberName: newMember.memberName,
            name: newMember.name,
            yob: newMember.yob,
          },
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  },
  renderRegisterPage: async (req, res) => {
    res.render("auth/register.ejs", { errorMessage: "", session: req.session });
  },
  registerSuccess: async (req, res) => {
    res.render("auth/registerSuccess.ejs", {
      memberName: req.query.memberName,
      name: req.query.name,
      yob: req.query.yob,
      session: req.session,
    });
  },

  login: async (req, res) => {
    const bodyData = req.body;
    // console.log(bodyData)
    try {
      const member = await MemberModel.findOne({
        memberName: bodyData.memberName,
      });
      if (!member) {
        return res.render("auth/login", {
          errorMessage: "Tài khoản không tồn tại",
        });
      }
      // if(member.password !== bodyData.password){
      //     return res.render("auth/login", {
      //         errorMessage: "Mật khẩu không đúng"
      //     })
      // }
      const isPasswordCorrect = await bcrypt.compare(
        bodyData.password,
        member.password
      );
      if (!isPasswordCorrect) {
        return res.render("auth/login", {
          errorMessage: "Mật khẩu không đúng",
          session: req.session,
        });
      }
      req.session.memberId = member._id;
      // res.redirect(
      //     url.format({
      //         pathname: "/login-success",
      //         query: {
      //             memberName: member.memberName,
      //         }
      //     })
      // )
      // res.redirect("/brands")
      if (member.isAdmin) {
        res.redirect("/admin");
      } else {
        res.redirect("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  renderLoginPage: async (req, res) => {
    res.render("auth/login.ejs", { errorMessage: "", session: req.session });
  },
  renderAdminPage: async (req, res) => {
    res.render("admin/dashboard.ejs", {
      errorMessage: "",
      layout: "admin/masterDashboard.ejs",
      session: req.session,
    });
  },
  // loginSuccess: async (req, res) => {
  //     res.render("auth/loginSuccess.ejs", {
  //         memberName: req.query.memberName,
  //     })
  // }
  logout: async (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
  googleSuccess: async (req, res) => {
    req.session.memberId = req.user._id;
    res.redirect("/");
  },
  getProfile: async (req, res) => {
    try {
      const member = await MemberModel.findById(req.session.memberId);
      res.render("profile.ejs", {
        member: member,
        session: req.session,
        errorMessage: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  updateProfile: async (req, res) => {
    const bodyData = req.body;
    const memberId = req.session.memberId;
    try {
      await MemberModel.findByIdAndUpdate(memberId, {
        name: bodyData.name,
        yob: bodyData.yob,
      });
      res.redirect("/profile");
    } catch (error) {
      console.log(error.message);
    }
  },
  changePassword: async (req, res) => {
    const bodyData = req.body;
    const memberId = req.session.memberId;
    try {
      const member = await MemberModel.findById(memberId);
      const isPasswordCorrect = await bcrypt.compare(
        bodyData.oldPassword,
        member.password
      );
      if (!isPasswordCorrect) {
        return res.render("profile.ejs", {
          errorMessage: "Mật khẩu cũ không đúng",
          session: req.session,
          member: member,
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(bodyData.newPassword, salt);
      await MemberModel.findByIdAndUpdate(memberId, { password: hashPassword });
      res.redirect("/profile");
    } catch (error) {
      console.log(error.message);
    }
  },
};
