const Scholar = require("../database/models/scholar.model");
const Request = require("../database/models/requests.model");
const queue = require("../workers/kue");

module.exports = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { scholar_id, supervisor_id, supervisor, scholar } =
      await Request.findById(_id);
    const filter = {
      _id: scholar_id,
    };
    const update = { isDirector: true, supervisor: supervisor };
    await Scholar.findOneAndUpdate(filter, update);
    res.send(`Finalized The Supervisor`);
  } catch (err) {
    console.error("profile error", err);
    next(err);
  }
};
