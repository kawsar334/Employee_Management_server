const jwt = require("jsonwebtoken")



const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access Denied: No Token Provided');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        // console.log(req.user.role)
        next();
    } catch (err) {
      
        res.status(400).send('Invalid Token');
    }
};


// admin verify 
const authenticateAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access Denied: No Token Provided');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: 'Access Denied: Admins Only' });
        }
        next(); 
    } catch (err) {
  
        res.status(400).send('Invalid Token');
    }
};

module.exports = { authenticateJWT, authenticateAdmin };