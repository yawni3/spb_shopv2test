const connectDB = require("./db.cjs");
const Product = require("./models/Product.cjs");

exports.handler = async (event) =>{
    await connectDB();

    //product list
    if(eveny.httpMethod === "GET"){
        try {
            const products = await Product.find();
            return {
                statusCode: 200,
                body: JSON.stringify(products)
            };
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: "Ürünler alınırken hata oluştu", error: err.message })
            };
        }
    }

    //Ürün ekleme
    if (event.httpMethod === "POST"){
        try{
            const data = JSON.parse(event.body);
            const product = new Product(data);
            await product.save();
            return {
                statusCode: 201,
                body: JSON.stringify(product)
            };
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: "Ürün eklenirken hata oluştu", error: err.message })
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: "Yöntem desteklenmiyor" })
    };
};