import express from 'express'

const checkout = express.Router()

// Create
checkout.post('/', (req, res, next) => {
  var stripe = require("stripe")(
    process.env.STRIPE_SK_TEST
  )

  stripe.charges.create({
    amount: req.body.total,
    currency: "usd",
    source: req.body.token,
    description: "Test charge!!!"
  }, function(err, charge) {
    if (err) {
      console.log(err.message)
    }
    console.log('Success')
  })
})

export default checkout
