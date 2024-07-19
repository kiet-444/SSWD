const WatchModel = require("../models/watch.model");
const MemberModel = require("../models/member.model");
const BrandModel = require("../models/brand.model");
const mongoose = require('mongoose');
const { Types } = mongoose;

function isPositiveInteger(value) {
  return /^[1-9]\d*$/.test(value);
}

module.exports = {
  createWatch: async (req, res) => {
    try {
      const memberName = req.decoded.memberName
      const isAdmin = await MemberModel.find({ memberName: memberName }, { isAdmin: true })
      if (!isAdmin) {
        throw new Error("Not Admin")
      }

      const { watchName, price, automatic, watchDescription, brand } = req.body



      if (!mongoose.Types.ObjectId.isValid(brand)) {
        return res.status(400).send({ message: "Invalid brand ID" });
      }

      const image = "http://localhost:5000/watch/image/" + req.file.filename;

      const watch = new WatchModel({
        watchName: watchName,
        price: price,
        automatic: automatic,
        watchDescription: watchDescription,
        brand: new mongoose.Types.ObjectId(brand),
        image: image
      })

      await watch.save()

      return res.status(201).send(watch);
    }
    catch (error) {
      console.log(error.message);
    }
  },

  renderCreateWatchPage: async (req, res) => {
    const bodyData = req.body;
    try {
      const brands = await BrandModel.find();
      res.render("admin/watch/create-watch.ejs", {
        brands,
        watch: bodyData,
        errorMessage: "",
        layout: "admin/masterDashboard.ejs",
        session: req.session,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getWatch: async (req, res) => {
    try {
      const watches = await WatchModel.find();
      // Extract brand IDs from watches
      const brandIds = watches.map(watch => watch.brand);

      // Fetch brands based on IDs
      const brands = await BrandModel.find({ _id: { $in: brandIds } });

      // Create a mapping of brand IDs to brand objects for quick lookup
      const brandMap = {};
      brands.forEach(brand => {
        brandMap[brand._id] = brand;
      });

      // Replace brand IDs in watches with actual brand objects
      const watchesWithBrands = watches.map(watch => ({
        ...watch.toObject(), // Convert Mongoose document to plain JavaScript object
        brand: brandMap[watch.brand] // Replace brand ID with actual brand object
      }));

      return res.status(200).send(watchesWithBrands);
    } catch (error) {
      console.log(error.message);
    }
  },
   getWatchById: async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid watch ID" });
      }
  
      const watch = await WatchModel.findById(id);
      if (!watch) {
        return res.status(404).send({ message: "Watch not found" });
      }
  
      const brand = await BrandModel.findById(watch.brand);
      if (!brand) {
        return res.status(404).send({ message: "Brand not found" });
      }
  
      const watchWithBrand = {
        ...watch.toObject(),
        brand: brand.toObject()
      };
  
      return res.status(200).send(watchWithBrand);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: "Server error" });
    }
  },
  deleteWatch: async (req, res) => {
    const watchId = req.params.id; // trong đg link là /delete-watch/:id nên nhớ viết id thoy
    // console.log(watchId)
    try {
      await WatchModel.findOneAndDelete({ _id: watchId });
      res.redirect("/watches");
    } catch (error) {
      console.log(error.message);
    }
  },
  renderEditWatchPage: async (req, res) => {
    const watchId = req.params.id;
    const brands = await BrandModel.find();
    try {
      const response = await WatchModel.findOne({ _id: watchId });
      res.render("admin/watch/edit-watch", {
        brands: brands,
        errorMessage: "",
        watch: response,
        layout: "admin/masterDashboard.ejs",
        session: req.session,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  editWatch: async (req, res) => {
    const bodyData = req.body;
    // console.log(bodyData)
    const watchId = req.params.id;
    const brands = await BrandModel.find();
    try {
      const response = await WatchModel.findOne({ _id: watchId });
      const isWatchNameExited = await WatchModel.findOne({
        watchName: bodyData.watchName,
      });
      if (isWatchNameExited) {
        return res.render("admin/watch/edit-watch.ejs", {
          brands: brands,
          errorMessage: "Please update the new name",
          watch: response,
          layout: "admin/masterDashboard.ejs",
          session: req.session,
        });
      }
      if (bodyData.watchName == "") {
        return res.render("admin/watch/edit-watch.ejs", {
          brands: brands,
          errorMessage: "Name cannot be left blank",
          watch: response,
          layout: "admin/masterDashboard.ejs",
          session: req.session,
        });
      }
      if (bodyData.image == "") {
        return res.render("admin/watch/edit-watch.ejs", {
          brands: brands,
          watch: response,
          errorMessage: "Image cannot be left blank",
          layout: "admin/masterDashboard.ejs",
          session: req.session,
        });
      }

      if (bodyData.price == "") {
        return res.render("admin/watch/edit-watch.ejs", {
          brands: brands,
          watch: response,
          errorMessage: "Price cannot be left blank",
          layout: "admin/masterDashboard.ejs",
          session: req.session,
        });
      }
      if (!isPositiveInteger(bodyData.price)) {
        return res.render("admin/watch/create-watch.ejs", {
          brands,
          watch: bodyData,
          errorMessage: "Price must be a positive integer",
          layout: "admin/masterDashboard.ejs",
          session: req.session,
        });
      }

      if (bodyData.watchDescription == "") {
        return res.render("admin/watch/edit-watch.ejs", {
          brands: brands,
          watch: response,
          errorMessage: "Description cannot be left blank",
          layout: "admin/masterDashboard.ejs",
          session: req.session,
        });
      }

      await WatchModel.findByIdAndUpdate(watchId, bodyData);
      res.redirect("/watches");
    } catch (error) {
      console.log(error.message);
    }
  },
  comment: async (req, res) => {
    const watchId = req.params.id;
    const bodyData = req.body;
    const idAuthor = req.session.memberId;
    bodyData.author = idAuthor;

    try {
      const response = await WatchModel.findOne({ _id: watchId });
      const brands = await BrandModel.findOne({ _id: response.brand });
      const existingComment = response.comments.find(
        (comment) => comment.author.toString() === idAuthor
      );
      if (existingComment) {
        req.flash("error", "You have already commented on this watch");
        return res.redirect(`/detail-watch/${watchId}`);
      }

      response.comments.push(bodyData);
      await response.save();
      res.redirect(`/detail-watch/${watchId}`);
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteComment: async (req, res) => {
    const watchId = req.params.id;
    const commentId = req.params.commentId;
    try {
      const response = await WatchModel.findOne({ _id: watchId });
      const commentIndex = response.comments.findIndex(
        (comment) => comment._id.toString() === commentId
      );
      if (commentIndex !== -1) {
        response.comments.splice(commentIndex, 1);
        await response.save();
      }
      await response.save();
      res.redirect(`/detail-watch/${watchId}`);
    } catch (error) {
      console.log(error.message);
    }
  },
};
