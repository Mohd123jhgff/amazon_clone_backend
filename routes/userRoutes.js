//include library
const router = require('express').Router();
const bcrypt = require('bcryptjs');
//const bcrypt = require('body-parser');
const bodyParser = require('body-parser');
const {check , validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const moment = require('moment')
const User = require('./../models/user');
const token_key = process.env.TOKEN_KEY;

//middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
//default router
//method:get
router.get(
    '/',
(req,res)=>{
   return res.status(200).json(
        {
            "status":true,
            "message":"User default route."
        }
    )
}
)


// user register route 
// access:public
// url: http://loca......
//method:post
router.post(
    '/register',   
  [
      // check empty fields
      check('username').not().isEmpty().trim().escape(),
      check('password').not().isEmpty().trim().escape(),
      // check email
      check('email').isEmail().normalizeEmail()
  ] ,
  (req,res)=>{
      const errors = validationResult(req);
      // check error is empty or not 
      if(!errors.isEmpty()){
        return res.status(400).json({
            "status":false,
            "errors":errors.array() 
        })
      }
       
    
      const salt = bcrypt.genSalt(10);//generate a string
      const hashedPassword = bcrypt.hash(req.body.password,salt);  //hashing using bcrypt.
      return res.status(200).json({
          "status":true,
          "data":req.body,
          "hashedPassword": hashedPassword
      })
  }
)
module.exports=router