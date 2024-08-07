const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register new user
router.post("/register", async (req, res)=> {
    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            //req.body
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
    }
});

//Login user

router.post("/login", async (req, res)=> {
    try{
        //Username incorrect
        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).json("Username or password is incorrect.");

        //Password incorrect
        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Username or password is incorrect.");

        const {password, ...others} = user._doc;
        res.status(200).json(others);

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router