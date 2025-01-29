
const mongoose = require("mongoose");

const database = ()=>{

    const db = process.env.DB

    mongoose.connect(db,)
        .then(() => console.log("Database connected"))
        .catch(err => console.error("Database connection error:", err));
}



module.exports = database; 

