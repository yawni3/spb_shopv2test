const connectDB = require("./db.cjs");
const Product = require("./models/Product.cjs");
const Order = require("./models/Order.cjs");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

exports.handler = async (event) =>{
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
}

  await connectDB();

   try {
    const totalProducts = await Product.countDocuments({ active: true});
    const totalOrders = await Order.countDocuments();

    return  {
     statusCode: 200,
     headers,
     body: JSON.stringify({
      totalProducts,
      totalOrders,
      totalVisitors: 0
     })
   };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message})};
  }
};