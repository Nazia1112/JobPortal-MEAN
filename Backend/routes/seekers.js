var express = require('express');
var router = express.Router();
var controller = require('../Controller/seekersControll');
var verify = require('../routes/verifyUser'); 

/* GET users listing. */
router.post('/add',controller.addUser);
router.post('/addfile',controller.addFile);
router.post('/addphoto',controller.addPhoto);

router.post('/login',controller.loginUser);
router.get('/userprofile',verify, controller.userprofile);
router.post('/updateprofile',verify, controller.updateprofile);
router.post('/editprofile',verify, controller.editprofile);
router.get('/appliedcompany', verify, controller.companydata);
module.exports = router;
