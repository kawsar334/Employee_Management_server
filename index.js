
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 7000;
const app = express();
app.use(cookieParser());
app.use(express.json()); 
const authRoute= require("./Routes/auth");
const userRoute = require("./Routes/user"); 
const workRoute = require("./Routes/work");
const messageRoute = require("./Routes/message");
const paymentRoute = require("./Routes/payment"); 
const stripeRoute = require("./Routes/stripe"); 

const database = require('./database/Database');
const bodyParser = require("body-parser");



app.use(bodyParser.json());

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://reliable-eclair-d8edc7.netlify.app'
];




app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    res.sendStatus(200);
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/work", workRoute);
app.use("/api/message", messageRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/stripe", stripeRoute);





app.get('/', (req, res) => {
    res.json('Initial  api is working *****************')
});

// database....
database()
app.listen(port, () => {
    console.log(`api running  in port: ${port}`);
})
