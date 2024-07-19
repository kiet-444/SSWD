const BrandModel = require("../models/brand.model");
const WatchModel = require("../models/watch.model");
const MemberModel = require("../models/member.model");

module.exports = {
  createBrand: async (req, res) => {
    try {
      const memberName = req.decoded.memberName
      const isAdmin = await MemberModel.find({ memberName: memberName }, { isAdmin: true })
      if (!isAdmin) {
        throw new Error("Not Admin")
      }
      const brandName = req.body.brandName

      if (!brandName) {
        return res.status(400).send({ message: "Pls send all required fields!" });
      }

      const brandFound = await BrandModel.findOne({ brandName: brandName })
      if (brandFound) {
        return res.status(400).send({ message: "Brand is already exist!" });
      }

      const brand = new BrandModel({
        brandName: brandName
      })
      await brand.save();
      return res.status(200).send(brand);
    } catch (error) {
      console.log(error.message);
    }
  },

  getBrand: async (req, res) => {
    const brand = await BrandModel.find()
    return res.status(200).send(brand);
  },

  updateBrand: async (req, res) => {
    const memberName = req.decoded.memberName
    const isAdmin = await MemberModel.find({ memberName: memberName }, { isAdmin: true })
    if (!isAdmin) {
      throw new Error("Not Admin")
    }
    const id = req.params.id
    const brandName = req.body.brandName

    console.log(id)
    console.log(brandName)

    const update = await BrandModel.findByIdAndUpdate(
      { _id: id },
      { brandName: brandName },
      { new: true },
    )

    return res.status(200).send(update)

  },


  deleteBrand: async (req, res) => {
    const memberName = req.decoded.memberName
    const isAdmin = await MemberModel.find({ memberName: memberName }, { isAdmin: true })
    if (!isAdmin) {
      throw new Error("Not Admin")
    }
    const brandId = req.params.id;
    try {
      const exitedBrandOfWatch = await WatchModel.findOne({ brand: brandId });
      if (exitedBrandOfWatch) {
        return res.status(201).send({ message: "The brand cannot be deleted because there is still a watch" })
      }
      await BrandModel.findOneAndDelete({ _id: brandId });
      return res.status(200).send({ message: "Deleted successfully" })
    } catch (error) {
      console.log(error.message);
    }
  },

};
