

// const router = require('express').Router()
// const Stripe = require('stripe');


// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// ;

// // router.post('/create-payment-intent', async (req, res) => {
// //     try {
// //         const { amount } = req.body;
// //         const paymentIntent = await stripe.paymentIntents.create({
// //             amount: amount * 100, 
// //             currency: 'usd',
// //             automatic_payment_methods: { enabled: true },
// //         });

// //         res.status(200).send({
// //             clientSecret: paymentIntent.client_secret,
// //         });
// //     } catch (error) {
// //         res.status(500).send({ error: error.message });
// //     }
// // });


// router.post('/create', async (req, res) => {
//     try {
//         const { amount,tokenId } = req.body;

//         const paymentIntent = await stripe.charges.create({
//             source: tokenId,
//             amount: amount * 100,
//             currency: 'usd',
//             automatic_payment_methods: { enabled: true },
//         },(stripeErr, stripeRes)=>{
//             if(stripeErr){
//                 res.status(500).json(stripeErr);
//             }else{
//                 res.status(200).json(stripeRes);
//             }
//         });

//         // res.status(200).send({
//         //     clientSecret: paymentIntent.client_secret,
//         // });
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// });




// module.exports = router;


const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create', async (req, res) => {
    try {
        const { amount, tokenId } = req.body;


        if (amount < 0.5) {
            return res.status(400).json({
                message: 'Amount must be at least $0.50',
            });
        }

        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: { token: tokenId },
        });
        
        // Create a PaymentIntent for the charge
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, 
            currency: 'usd',
            payment_method: paymentMethod.id,
            return_url: "https://reliable-eclair-d8edc7.netlify.app/",
            confirm: true, 
        });

        res.status(200).json({
            message: 'Payment successful',
            paymentIntent,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
