const connectDB = require("./db.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: String,
  password: String
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  await connectDB();

  try {
    const { email, password } = JSON.parse(event.body);
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return { statusCode: 401, body: JSON.stringify({ error: "Hatalı email veya şifre" }) };
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return { statusCode: 401, body: JSON.stringify({ error: "Hatalı email veya şifre" }) };
    }

    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ token })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};