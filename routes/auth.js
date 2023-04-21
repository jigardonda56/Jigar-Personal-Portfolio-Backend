const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs'); //bcryptJs
var jwt = require('jsonwebtoken');  //jsonwebtoken
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'thisisjwtsecretstring';

//ROUTE -1: create a user using : POST "/api/auth/createuser" does not require login
router.post('/createuser', [

    // express validetor package used for validations
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 charachters').isLength({ min: 5 }),

], async (req, res) => {

    //check for errors from express validetor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //check if the user with this email exiest already
        let user = await User.findOne({ email: req.body.email });
        let success = false;
        if (user) {
            return res.status(400).json({ error: 'Sorry user with this email already exists' });
        }

        //using node package called bcryptJs to store password securly
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //if user with unique email then create user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken, user });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})

//**********************************************************************************
//ROUTE -2: authenticate a user using : POST "/api/auth/login" does not require login
router.post('/login', [

    // express validetor package used for validations
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists()

], async (req, res) => {

    //check for errors from express validetor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //check email and password
    const { email, password } = req.body;
    try {
        //check email
        let user = await User.findOne({ email });
        let success = false;
        if (!user) {
            return res.status(400).json({success, error: 'Please try to login with correct credentials' });
        }

        //check password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})


//ROUTE -3: get loggedin user details a user using : POST "/api/auth/getuser" Require login
router.post('/getuser', fetchuser, async (req, res) => {

    try {

        const userId = req.user.id; //req.user is coming from fetchuser.js
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");
        
    }

});

module.exports = router