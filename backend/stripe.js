const express = require('express');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.static('public'));
app.use(express.json()); 

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount } = req.body;
        
        const numAmount = parseFloat(amount);
        
        if (isNaN(numAmount) || numAmount < 1 || numAmount > 10000) {
            return res.status(400).json({ 
                error: 'Invalid amount. Must be between 1 and 10000.' 
            });
        }
        
        const amountInCents = Math.round(numAmount * 100);
        
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
            success_url: 'http://localhost:3000/success.html',
            cancel_url: 'http://localhost:3000/cancel.html',
        });
        
        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));