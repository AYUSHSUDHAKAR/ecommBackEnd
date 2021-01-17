// const stripe = require("stripe")(`${process.env.STRIPEKEY}`);
const uuid = require("uuid/v4");

const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51I0Wb0KqHKGFHkOJKeHpGHuC0NlM3IO3YVWXNMFeH9tu2YdoieAlipFeh0Ti5i6o3piToizULCsUmkBree0O8rLz00vBw98nBz"
);

exports.stripePayment = async (req, res) => {
  const { products, token } = req.body;
  // console.log("PRODUCT", products);
  // console.log("PRICE", products.price);

  let amount = 0;
  products.map((p) => {
    amount = amount + p.price;
  });
  console.log(amount);

  const idempontencyKey = uuid();

  // const session = stripe.customers;
  // // .create({
  // //   email: token.email,
  // //   source: token.id,
  // // })
  // // .then((customer) => {

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "tshirts",
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000",
    cancel_url: "https://localhost:3000/home",
  });

  // // });

  res.json({ id: session.id });
  console.log(session.id);

  // return stripe.customers
  //   .create({
  //     email: token.email,
  //     source: token.id,
  //   })
  //   .then((customer) => {
  //     stripe.charges
  //       .create(
  //         {
  //           amount: amount,
  //           currency: "usd",
  //           customer: customer.id,
  //           receipt_email: token.email,
  //           description: `purchase of ${product.name}`,
  //           shipping: {
  //             name: token.card.name,
  //             address: {
  //               line1: token.card.address_line1,
  //               line2: token.card.address_line2,
  //               city: token.card.address_city,
  //               country: token.card.address_country,
  //               postal_code: token.card.address_zip,
  //             },
  //           },
  //         },
  //         { idempontencyKey }
  //       )
  //       .then((result) => res.status(200).json(result))
  //       .catch((err) => console.log(err));
  //   });
};
