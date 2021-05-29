const express = require('express');
const cors = require('cors');
const stripe = require('stripe')
                      ('sk_test_51Ips86SBiMWz47PPF8mVPWQ1CSyxnaZ6fyLSr2OE2JcSesqFx5JfWNpRhIwurErNVbWuQoqaot3az9Lx26lbRgbc00z37IDs07');
//port
const port = process.env.PORT || 3000;

//express application configuration..
const app = express();

//middlewares..
app.use(express.json());
app.use(cors({origin:true}));
//api routes
app.get('/',(req,res) =>
{
    res.send('Hello Jithender Reddy!!');
});

app.post('/payments/create',async (req,res) =>
{
    const total = req.query.total;
    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:'inr'
    });
    //201 - created
    res.status(201).send({
        clientSecret:paymentIntent.client_secret
    });

});

//server is listening on 3000 port
app.listen(port,() =>
{
    console.log('server is up on port,',port);
});