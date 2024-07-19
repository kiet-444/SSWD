const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("./configs/connectDb");

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authRouter = require("./routers/auth.router");
const brandRouter = require("./routers/brand.router");
const watchRouter = require("./routers/watch.router");
const memberRouter = require("./routers/member.router");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const uploadDir = "./public/uploads"

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${uniqueSuffix}${extension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.use(upload.single("image"));

app.use("/watch/image/", express.static(path.join("public", "uploads")));

app.use("/auth", authRouter);
app.use("/admin/brand", brandRouter)
app.use("/admin/watch", watchRouter);
app.use("/admin", memberRouter)

connectDB();

app.listen(5000, () => console.log("Server start port 5000"));
