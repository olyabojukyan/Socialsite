const express = require('express');
const { index, homeContent, profile, changePhoto } = require('../controllers/IndexController');
const { verifyToken } = require('../middlewares/auth');
const { resaizeImage, upload } = require('../middlewares/upload');
const router = express.Router();

/* GET home page. */
router.get('/', index);

router.post("/",verifyToken,homeContent);

router.get('/profile/:id',profile);

router.post("/changePhoto",
verifyToken,
upload,
resaizeImage,
changePhoto
)



module.exports = router;
