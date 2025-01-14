
const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 3600000, 
    // sameSite: "Lax", 
    // domain: "http://localhost:5174"

}


module.exports = options