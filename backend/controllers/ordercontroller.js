const Order = require("../models/orders");
const Product = require("../models/product");
const Stripe = require("stripe");

// =======================
// PLACE ORDER (COD)
// =======================

exports.placeordercod = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;

    if (!items || items.length === 0 || !address) {
      return res.json({ success: false, message: "Invalid order data" });
    }

    let orderItems = [];
    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) continue;

      orderItems.push({
        name: product.name,
        image: product.img[0],   // ✅ IMAGE STORED HERE
        price: product.offerprice,
        quantity: item.quantity,
      });

      amount += product.offerprice * item.quantity;
    }

    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items: orderItems,
      amount,
      address,
      paymenttype: "COD",
      ispaid: false,
    });

    res.json({ success: true, message: "Order placed successfully" });

  } catch (error) {
    console.log("ORDER ERROR:", error);
    res.json({ success: false, message: "Server error" });
  }
};




exports.placeorderstripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;
    const { origin } = req.headers;

    if (!address || !items || items.length === 0) {
      return res.json({
        success: false,
        message: "Invalid order data",
      });
    }

    // ✅ Stripe initialized INSIDE function
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    let productdata = [];
    let orderItems = [];
    let amount = 0;

    // Prepare order + calculate amount
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;

      productdata.push({
        name: product.name,
        price: product.offerprice,
        quantity: item.quantity,
      });

      orderItems.push({
        name: product.name,
        image: product.img[0],
        price: product.offerprice,
        quantity: item.quantity,
      });

      amount += product.offerprice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    // Create order (UNPAID)
    const order = await Order.create({
      userId,
      items: orderItems,
      amount,
      address,
      paymenttype: "STRIPE",
      ispaid: false,
    });

    // Stripe line items
    const line_items = productdata.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.floor(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId: userId.toString(),
      },
    });

    return res.json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.log("STRIPE ORDER ERROR:", error.message);
    return res.json({
      success: false,
      message: "Server error",
    });
  }
};




































// =======================
// GET USER ORDERS
// =======================
exports.getuserorder = async (req, res) => {
  try {
    const userId = req.userId; // ✅ FIX HERE

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    console.log("GET USER ORDER ERROR:", error.message);
    res.json({ success: false, message: "Server error" });
  }
};

// =======================
// GET ALL ORDERS (ADMIN)
// =======================
exports.getallorders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    console.log("GET ALL ORDER ERROR:", error.message);
    res.json({ success: false, message: "Server error" });
  }
};
