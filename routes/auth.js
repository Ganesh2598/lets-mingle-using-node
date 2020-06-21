const router = require("express").Router();
const User = require("../database").user;
const Post = require("../database").post;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register",(req, res)=> {
    const userData = {
        name : req.body.name,
        email : req.body.email,
        imageUrl : req.body.url,
        password : req.body.password
    }
    User.findOne({where : {email : userData.email}})
        .then(user =>{
            if (user) {
                res.json({
                    error : "User already exists"
                })
            }else{
                const hash = bcrypt.hashSync(userData.password,10);
                if (hash) {
                    userData.password = hash;
                    User.create(userData)
                    .then(data => {
                        res.json(data)
                    })
                    .catch(err =>{
                        res.json({
                            error : err
                        })
                    })
                }else{
                    res.json({
                        error : "Problem on hashing Password"
                    })
                }
            }
        })
        .catch(err =>{
            res.json({
                error : err.message
            })
        })
})

router.post("/login",(req, res)=> {
    const { email, password } = req.body;
    User.findOne({where : {email : email}})
        .then(userData =>{
            if(!userData) {
                res.json({
                    error : "Username (or) Password is Wrong"
                })
            }
            if (bcrypt.compareSync(password, userData.password)){
                const token = jwt.sign({email : userData.email},process.env.JWT_KEY)
                res.json({
                    token : token,
                    data : userData
                })
            }else{
                res.json({
                    error : "Username (or) Password is Wrong"
                })
            }
        })
        .catch(err =>{
            res.json({
                error : err.message
            })
        })
})


module.exports = router;
