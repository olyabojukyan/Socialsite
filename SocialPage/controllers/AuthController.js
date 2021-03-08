const { UserModel }=require("../models/UserModel")
const  bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
require("dotenv").config()

class AuthController{
    async registerNewUser(req,res){

        try{
            let hashPassword= bcrypt.hashSync(req.body.password)
            console.log("hash",hashPassword)
            let newUser=new UserModel({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
            })
            let newUserInfo=await  newUser.save()
            res.json({data:newUserInfo})
        }catch(err){
            console.log(err)
            res.json({error:err.message})
        }     
    }

    async loginUser(req,res){
        try{
            let user=await UserModel.findOne({email:req.body.email})
            if(!user){
               return res.json({error:"Email or Password is invalid"}) 
            } 
            let passwordOk= bcrypt.compareSync(req.body.password, user.password)
            if(!passwordOk){
              return res.json({error:"Email or Password is invalid"})  
            } 
            let payload={
                id:user._id,
                email:user.email,
                username:user.username
            }
            let accessToken= jwt.sign(payload,process.env.jwtAccessSecret,{expiresIn:process.env.jwtAccessSecretLT})

             res.json({user,accessToken})

        }catch(err){
            res.json({error:err.message})
        }
    }
}

module.exports=new AuthController()