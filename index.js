
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



const database = require('./database/Database');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
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
}));



app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/work", workRoute);
app.use("/api/message", messageRoute);




app.get('/', (req, res) => {
    res.json('Initial  api is working *****************')
});


database()
app.listen(port, () => {
    console.log(`api running  in port: ${port}`);
})
