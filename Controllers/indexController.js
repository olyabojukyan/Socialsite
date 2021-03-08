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
      async profile(req,res){
                  let userInfo=await UserModel.findOne({_id:req.params.id})
                res.render("profile",{userInfo})
              
             }
    sendUserId(req,res){
        res.json({id:req.user.id})   
            }                                         
    async changePhoto(req,res){
         try{
        let user=await UserModel.findById(req.user.id)
        let oldImageName=user.image
        user.image=req.file.filename
        let userNeInfo=await user.save()
        res.json(userNeInfo.image)
        try{
              if(oldImageName!="/default_profile.png"){
              fs.unlink(path.join(__dirname,"..","/public/images/",oldImageName),(err)=>{
              console.log("image deleted")
               })
             }
                       }catch(err){
                           console.log(err)
                           res.json(err.message)
                       }
               }catch(err){
                      console.log(err)
                      res.json(err)
                    }
                  }      
}

module.exports=new IndexController()