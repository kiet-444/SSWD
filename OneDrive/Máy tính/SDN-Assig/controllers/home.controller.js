const BrandModel = require("../models/brand.model");
const WatchModel = require("../models/watch.model");
const CommentModel = require("../models/comment.model");

module.exports = {
  getWatch: async (req, res) => {
    try {
      const response = await WatchModel.find();
      // console.log(response)
      const brands = await BrandModel.find();

      return res.render("home.ejs", {
        watches: response,
        brands: brands,
        errorMessage: "",
        session: req.session,
        // layout: "master.ejs"
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  getWatchDetail: async (req, res) => {
    const watchId = req.params.id;

    try {
      const response = await WatchModel.findOne({ _id: watchId }).populate({
        path: "comments",
        populate: {
          path: "author",
          select: "name",
        },
      });
      const brands = await BrandModel.findOne({ _id: response.brand });

      res.render("detail-watch", {
        brands: brands,
        errorMessage: "",
        watch: response,
        session: req.session,
        // layout: "master.ejs"
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
