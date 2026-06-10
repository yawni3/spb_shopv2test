const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  date: { type: String },
  visitors: { type: Number, default: 0 },
  pageViews: { type: Number, default: 0 }
});

module.exports = mongoose.models.Stat || mongoose.model("Stat", statSchema);