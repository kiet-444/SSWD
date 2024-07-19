const MemberModel = require("../models/member.model");

module.exports = {
  getMembers: async (req, res) => {
    try {

      const memberName = req.decoded.memberName
      const isAdmin = await MemberModel.find({ memberName: memberName }, { isAdmin: true })
      if (!isAdmin) {
        throw new Error("Not Admin")
      }
      
      const members = await MemberModel.find({ isAdmin: false })
      return res.status(201).send(members);
    } catch (error) {
      console.log(error.message);
    }
  },
};
