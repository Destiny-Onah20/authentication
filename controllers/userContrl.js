require("dotenv").config();
const models = require("../models").users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signUp = async(req,res)=>{
    try {
        const { name, email, password, } = req.body;
        const checkEmail = await models.findOne({
            where: {email: email}
        });
        if(checkEmail){
            res.status(400).json({
                status: "Failed",
                message: "Email already exist. "
            })
        }else{
            const saltPasswrd = await bcrypt.genSalt(10);
            const hashPasswrd = await bcrypt.hash(password, saltPasswrd);
            const genToken = await jwt.sign({
                name,
                email,
                password
            }, process.env.jwtSecret,{
                expiresIn: "1d"
            });
            
            const userData = {
                name,
                email,
                password: hashPasswrd,
                token: genToken
            };
            const newUser = await models.create(userData);
            if(!newUser){
                res.status(400).json({
                    status: "Failed",
                    message: "Failed to create User"
                })
            }else{
                res.status(201).json({
                    message: "Created successfully",
                    data: newUser
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
};

module.exports = {
    signUp
}