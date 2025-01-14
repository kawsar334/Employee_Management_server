
const mongoose = require("mongoose");

const database = ()=>{
    
    mongoose.connect("mongodb+srv://kawsarfiroz11:kawsar@cluster0.lj3q0.mongodb.net/", 
    { 
        // useNewUrlParser: true,
        //  useUnifiedTopology: true,
         }
    )
        .then(() => console.log("Database connected"))
        .catch(err => console.error("Database connection error:", err));
}



module.exports = database; 

