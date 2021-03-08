const multer=require("multer")
const sharp = require('sharp');
const path=require("path")
const fs=require("fs")
const Storage=multer.diskStorage({
  destination:function(req,file, cb){
      cb(null,path.join(__dirname,"..","/public/images/uploads") )
  },
  filename:function(req,file, cb){
      cb(null,Date.now()+file.originalname) 
  }
})
// Filter files with multer
const multerFilter = (req, file, cb) => {
      if (file.mimetype.startsWith("image")) {
        cb(null, true);
      } else {
        cb("Not an image! Please upload only images.", false);
      }
    };
    let upload = multer({ 
                 storage : Storage,
                 limit:4*1024*1024,
                 fileFilter: multerFilter, 
               
    }).single('avatar');  
    const resaizeImage=async (req,res,next)=>{
          const { filename: image } = req.file 
          await sharp(req.file.path)
           .resize(300,300,{
            fit: 'cover',
            position: 'center',
           })
           .jpeg({quality: 50})
           .toFile(
               path.resolve(__dirname, "..","public/images/",image)
           )
           fs.unlinkSync(req.file.path)
           next()
        }
         module.exports={
          upload,
          resaizeImage
         
        }
          