const connectDB = require("./db.cjs");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: String,
  password: String
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

exports.handler = async () => {
  await connectDB();

  try {
    const existing = await Admin.findOne({ email: "admin@sleepypiebakery.art" });
    if (existing) {
      return { statusCode: 200, body: JSON.stringify({ message: "Admin zaten var!" }) };
    }

    const hashed = await bcrypt.hash("SPBAdmin2024!", 10);
    await Admin.create({
      email: "admin@sleepypiebakery.art",
      password: hashed
    });

    return { statusCode: 201, body: JSON.stringify({ message: "Admin oluşturuldu! 🎉" }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};