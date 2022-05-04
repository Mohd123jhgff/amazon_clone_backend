//include library
const router = require('express').Router();
const bcrypt = require('bcryptjs');
//const bcrypt = require('body-parser');
const bodyParser = require('body-parser');
const {User , validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const moment = require('moment')
const user = require('./../models/usermodel');
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
  
  (req,res)=>{
      const errors = validationResult(req.body);
      // check error is empty or not 
      if(!errors.isEmpty()){
        return res.status(400).json({
            "status":false,
            "errors":errors.array() 
        })
      }
       
    
    
      user.findOne({email:req.body.email}).then((user)=>{
          //check email exist or not
          if(user){
              return res.status(409).json({
                  "status":false,
                  "message":"user email already exists"
              })
          }else{
              const salt =  bcrypt.genSaltSync(10);//generate a string
              let hashedPassword = bcrypt.hashSync(req.body.password,salt);  //hashing using bcrypt.

              const newUser=new User({
                  email:req.body.email,
                  username:req.body.username,
                  password:hashedPassword
              })
              newUser.save().then(result =>{
                  return res.status(200).json({
                      "status":true,
                      "user":result
                  })
              }).catch(error =>  {
                  return res.status(501).json({
                      "status":false,
                      "error":error
                  })
              })
          }
      }).catch(error =>{
          return res.status(500).json({
              "status":false,
              "error":error
          })
      })
    }
)
module.exports=router