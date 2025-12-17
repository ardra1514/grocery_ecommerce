const { v2: cloudinary } = require("cloudinary");
const product = require("../models/product");

exports.addproduct = async (req, res) => {
  try {
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

    const productData = JSON.parse(req.body.productdata);

    const images = req.files;
    if (!images || images.length === 0) {
      return res.json({ success: false, message: "No images uploaded" });
    }

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await product.create({ ...productData, img: imagesUrl });

    return res.json({ success: true, message: "Product added" });

  } catch (error) {
    console.log("Add Product Error:", error);
    return res.json({ success: false, message: error.message });
  }
};






exports.productlist = async (req, res) => {
  try {
    const products = await product.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: "Server Error" });
  }
};




exports.productbyId=async(req,res)=>{
    
try {
    
const {id}=req.body

                const product=await product.findById(id)

                res.json({success: true,product})



} catch (error) {
        res.json({ success: false, message: "Server Error" });
    
}



}


exports.changestock=async(req,res)=>{

try {
    
  const {id ,instock}=req.body    
  await product.findByIdAndUpdate(id,{instock})  
                res.json({success: true,message:"stocke updated"})



} catch (error) {
        res.json({ success: false, message: "Server Error" });
    
}
    




}


