const express = require("express");

const app = express();

const connectDB = require("./configs/connectDb");

const expressLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");

const HomeRouter = require("./routers/home.router");
const AuthRouter = require("./routers/auth.router");
const BrandRouter = require("./routers/brand.router");
const CommentRouter = require("./routers/comment.router");
const WatchRouter = require("./routers/watch.router");
const MemberRouter = require("./routers/member.router");
const passport = require("passport");
require("./configs/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

app.set("layout", "./master");

app.use(express.static("./public"));

app.use(expressLayout);
// Set up flash middleware
app.use(flash());

app.use(
  session({
    secret: "MEMBERAUTH", // key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // lưu vào cookie
  })
);
app.use((req, res, next) => {
  res.locals.successMessages = req.flash("success");
  res.locals.errorMessages = req.flash("error");
  next();
});
app.use(passport.initialize());
app.use(passport.session());

app.use("/", HomeRouter);
app.use("/", AuthRouter);
app.use("/", BrandRouter);
app.use("/", CommentRouter);
app.use("/", WatchRouter);
app.use("/", MemberRouter);

connectDB();

app.listen(5000, () => console.log("Server start port 5000"));
