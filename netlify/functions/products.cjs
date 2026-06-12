const connectDB = require("./db.cjs");
const Product = require("./models/Product.cjs");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  await connectDB();

  // Ürün listele
  if (event.httpMethod === "GET") {
    try {
      const products = await Product.find({ active: true });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(products)
      };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
    }
  }

  // Ürün ekle
  if (event.httpMethod === "POST") {
    try {
      const data = JSON.parse(event.body);
      const product = new Product(data);
      await product.save();
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(product)
      };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
    }
  }

  // Ürün sil
  if (event.httpMethod === "DELETE") {
    try {
      const id = event.path.split("/").pop();
      await Product.findByIdAndDelete(id);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Ürün silindi" })
      };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: "Yöntem desteklenmiyor" })
  };
};