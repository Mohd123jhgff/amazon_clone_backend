//include library
const router = require('express').Router();
const bcrypt = require('body-parser');
const bodyParser = require('body-parser');
const {check , validationResult, body} = require('express-validator')
const jwt = require('jsonwebtoken');
const moment = require('moment')
const User = require('./../models/user');
const token_key = process.env.TOKEN_KEY;

//middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
//default router
router.get(
    '/',
(req,res)=>{
    res.status(200).json(
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
router.post(
    '/register',   
  [
      // check empty fields
      check('username').not().isEmpty().trim().escape(),
     // check('password').not().isEmpty(),
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
      return res.status(200).json({
          "status":true,
          "data":req.body
      })
  }
)
module.exports=router