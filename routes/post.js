const router = require("express").Router();
const User = require("../database").user;
const Post = require("../database").post;
const requireLogin = require("../middleware/requireLogin");

router.post("/createpost",requireLogin,(req, res)=> {
    console.log(req.userData)
    const postData = {
        caption : req.body.caption,
        imageUrl : req.body.url,
        fk_userid : req.userData.userid,
        userName : req.userData.name
    }
    
    Post.create(postData)
    .then(data => {
        res.json(data)
    })
    .catch(err =>{
        res.json({
            error : err
        })
    })
})

router.get("/mypost",requireLogin,(req, res)=> {
    Post.findAll({where : {fk_userid : req.userData.userid}})
        .then(posts =>{
            res.json(posts)
        })
        .catch(err=> {
            res.json({
                error : err
            })
        })
})

router.get("/userpost/:id",requireLogin, (req, res)=> {
    const id = req.params.id
    Post.findAll({where : {fk_userid : id}})
        .then(data =>{
            res.json(data)
        })
        .catch(err =>{
            console.log(err)
            res.json({
                error : err
            })
        })
})

router.get("/allpost",(req, res)=> {
    Post.findAll()
        .then(data =>{
            res.json(data)
        })
        .catch(err =>{
            res.json({
                error :err
            })
        })
})

module.exports = router;