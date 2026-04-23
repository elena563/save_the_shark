const express = require('express');
const Stripe = require('stripe');
const path = require('path');
require('dotenv').config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Environment variables with defaults
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:1313';

// CORS - permetti richieste dal frontend Hugo
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // In produzione usa il tuo dominio specifico
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
});

// Serve file statici dalla cartella public (usa path assoluto)
app.use(express.static(path.join(__dirname, 'public')));
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
            success_url: `${BACKEND_URL}/success.html`,
            cancel_url: `${BACKEND_URL}/cancel.html`,
        });
        
        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

app.get('/api/config', (req, res) => {
    res.json({ frontendUrl: FRONTEND_URL });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));