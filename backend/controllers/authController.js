const jwt = require('jsonwebtoken'); // to generate token
const bcrypt = require('bcrypt'); // encrypt password
// Check validation for requests
const gravatar = require('gravatar'); // get user image by email
const User= require('../models/User')

exports.checkUser= async (req,res)=> {
    try{
        const user=await User.findById(req.user.id).select('-password')
        res.status(200).json(user)
    }
    catch(error){
        console.log(error.message);
        res.status(400).send('Server error');
    }
}

module.exports.register_post= async(req,res)=>{
    const { firstName, lastName, username, email, password } = req.body;
    try{
        let user= await User.findOne({email});
        if(user){
            return res.status(400).json({
                errors:[{
                    message: 'User already exists',
                }],
            });
        }
        const avatar=gravatar.url(email,{
            s: '200', // Size
            r: 'pg', // Rate,
            d: 'mm',
        });
        user = new User({
            firstName,
            lastName,
            username,
            email,
            password,
            avatar,
        });

        const salt = await bcrypt.genSalt(10); // generate salt contains 10
        // save password
        user.password = await bcrypt.hash(password, salt); // use user password and salt to hash password
        //save user in databasw
        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        res.status(201).json({message: "Admin created Successfully..!",});

    }
    catch(error){
        console.log(error.message);
        res.status(400).send('Server error');
    }
}

module.exports.login_post= async(req,res)=>{
    const { email,password } = req.body;
    try{
        let user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                errors:[{
                    message: 'Invalid credentials',
                }],
            });
        }
        // Know user founded by email let's compare passwords
        const isMatch= await bcrypt.compare(password,user.password);
        // passwords don't match
        if(!isMatch){
            return res.status(400).json({
                errors: [{
                  message: 'Invalid credentials'
                }]
              })
        }
        const payload = {
            user: {
              id: user.id,
              role: user.role,
            }
        }
        
        jwt.sign( payload, process.env.jwt_secret,{ expiresIn: 360000,},(err,token)=>{
            if(err) throw err;
            const { _id, firstName, lastName, username, email,avatar, fullName } = user;
            res.status(200).json({
                token,
                user: { _id, firstName, lastName, username, email, avatar, fullName }
            });
        });
    }
    catch(error){
        console.log(err.message);
        res.status(400).send('Server error');
    }

}