const connectDB = require("./db.cjs");

exports.handler = async () => {
  try {
    await connectDB();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "MongoDB bağlantısı başarılı! 🎉" })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Bağlantı hatası", error: err.message })
    };
  }
};