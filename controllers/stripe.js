const prisma = require("../config/prisma")
const stripe = require('stripe')('sk_')
 // ('test_51RmbDUPDC7tuqqBCz0HLgeNjDHbm1Bw5Hz6Hm95ISYSHZqmArboBqaNs3X0Z8c8cEfCANvB7EllFEozKNt4oRywD00QNHvTeaY');

exports.payment = async (req, res) => {
  try {
    //code

    // /check user
   // req.user.id
    console.log("user:id", req.user.id);
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: req.user.id
      }
    })
    const amountTHB = cart.cartTotal*100; // Convert to THB cents
    console.log("amountTHB:", amountTHB);

 
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountTHB,
      currency: 'thb',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log("client_secret:", paymentIntent.client_secret)
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" })
  }
}