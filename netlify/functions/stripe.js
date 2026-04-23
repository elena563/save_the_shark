const express = require('express');
const serverless = require('serverless-http');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware body parser
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    next();
});

const router = express.Router();

// POST endpoint per creare sessione Stripe
router.post('/', async (req, res) => {
    try {
        console.log('Received body:', req.body);
        
        let body = req.body;
        if (Buffer.isBuffer(body)) {
            body = JSON.parse(body.toString());
        } else if (typeof body === 'string') {
            body = JSON.parse(body);
        }
        
        const { amount } = body;
        
        const numAmount = parseFloat(amount);
        
        if (isNaN(numAmount) || numAmount < 1 || numAmount > 10000) {
            return res.status(400).json({ 
                error: 'Invalid amount. Must be between 1 and 10000.' 
            });
        }
        
        const amountInCents = Math.round(numAmount * 100);
        
        const SITE_URL = process.env.URL || 'http://localhost:8888';
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Donation to Save the Sharks',
                            description: `Donation of €${numAmount.toFixed(2)}`,
                        },
                        unit_amount: amountInCents,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${SITE_URL}/success.html`,
            cancel_url: `${SITE_URL}/cancel.html`,
        });
        
        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

app.use('/.netlify/functions/stripe', router);

module.exports.handler = serverless(app);