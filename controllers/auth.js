const { ErrorResponse, SuccessResponse } = require("../middleware/customMessage")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const options = require("../middleware/options");



// Register
const Register  =async(req, res,next)=>{
   try{
    const { password} = req.body;
    const UserExist =await User.findOne({email:req.body.email});
    if(UserExist){
      return res.status(400).json(ErrorResponse(400,"user Already Exists"))
    }else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser =  new User({
            ...req.body,
            password: hashedPassword,

        });

        const user = await newUser.save();
        return res.status(201).json(SuccessResponse(201, "Registration successful", user))
    }
   }catch(err){
    console.log(err)
       return res.status(400).json(ErrorResponse(400, err))
   }
}


// login 

const Login = async(req, res, next)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json(ErrorResponse(400, "User Not Found"))
        }else{
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json(ErrorResponse(400, "Invalid Email or password"))
            }else{
                const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h'});
                return res.cookie(
                    "token",
                    token,
                    options
                ).json({token, user})
            }
        }
    
    }catch(err){
        console.log(err)
        return res.status(400).json(ErrorResponse(400, err))
    }
};


//login with google functionality 
const googleLogin = async (req, res, next) => {
    try {
        const { email, name, photoURL } = req.body; 

        if (!email) {
            return res.status(400).json(ErrorResponse(400, "Email is required"));
        }
        let user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            return res
                .cookie("token", token, options)
                .status(200)
                .json(SuccessResponse(200, "Login successful", { token, user }));
        } else {
            const newUser = new User({
                name,
                email,
                photoURL,
                role: "employee",
            });

            user = await newUser.save();

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return res
                .cookie("token", token, options)
                .status(201)
                .json(SuccessResponse(201, "Registration and login successful", { token, user }));
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json(ErrorResponse(500, "Internal Server Error"));
    }
};

const logout = (req, res, next) => {
    try {
        res.cookie("token", "", {
            expires: new Date(0),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" 
        });
        return res.status(200).json(SuccessResponse(200, "Logout successful"));
    } catch (err) {
        console.log(err);
        return res.status(500).json(ErrorResponse(500, "Internal Server Error"));
    }
};


const jwtSignin = async (req, res, next) => {
    try {

        const token = jwt.sign(
            { id:req.body._id, role: req.body.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res
            .cookie("token", token, options)
            .status(201)
            .json(SuccessResponse(201, "Registration and login successful", { token, user }));
    }catch (err) {
        consoe.log(err);
    }
}

module.exports = { Register, Login, googleLogin, logout, jwtSignin }