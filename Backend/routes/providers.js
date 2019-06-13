var express = require('express');
var router = express.Router();
var verify = require('../routes/verifyUser'); 
var Controll = require('../Controller/providerControll');  
/* GET home page. */
router.post('/add', Controll.addUser );
router.post('/login', Controll.loginUser );
router.post('/addPost',verify,Controll.addPost);
router.get('/providerPost',verify,Controll.getproviderPosts);
router.delete('/deletePost/:_id',verify,Controll.deletePost);
router.get('/allPost',Controll.getallPosts);
router.post('/applyPost',verify,Controll.applyPost);
router.get('/appliedpostusers',verify,Controll.usersdata);
router.post('/getPost',Controll.getPost);
router.post('/search',Controll.searchSkill);
router.get('/companyprofile',verify, Controll.companyprofile);
router.post('/editprofile',verify, Controll.editprofile);
router.post('/updateprofile',verify, Controll.updateprofile)
module.exports = router;
