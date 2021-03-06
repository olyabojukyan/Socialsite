const { UserModel }=require("../models/UserModel")

class IndexController {
    index(req,res){
        res.render("index")
    }
    async homeContent(req,res){
       try{
         
          let userInfo=await UserModel.findOne({_id:req.user.id})
        
          res.json({userInfo})
       }catch(err){
       
           res.json({error:err.message})
       }
        

    }
}

module.exports=new IndexController()