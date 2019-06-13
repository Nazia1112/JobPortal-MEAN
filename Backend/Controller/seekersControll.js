const Seeker = require('../config/models/JobSeekerSchema');
var multer = require('multer');
var path = require('path');
var jwt = require('jsonwebtoken');
var post = require('../config/models/post');


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
        console.log(file);
        let filename = file.originalname.split('.')[0] + '-' + Date.now() + '-' + 'jobs' + path.extname(file.originalname);
        console.log(filename, "sdffd");

        callback(null, filename);
    }
});

const storage1 = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images');
    },
    filename: function (req, file, callback) {
        console.log(file);
        let filename = file.originalname.split('.')[0] + '-' + Date.now() + '-' + 'jobs' + path.extname(file.originalname);
        console.log(filename, "sdffd");

        callback(null, filename);
    }
});
// Multer function
var upload = multer({
    storage: storage
}).single('Resume');

var uploadphoto = multer({
    storage: storage1
}).single('Photo');





module.exports.addFile = function (req, res, next) {

    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.json({ data: null });
        }
        else {
            console.log(req.file.filename);
            res.json({ "status": 200, filename: req.file.filename, msg: { str1: 'SuccessFully Uploaded', str2: '' } });
        }
    });
}

module.exports.addPhoto = function(req,res,next){
    uploadphoto(req, res, (err) => {
        if (err) {
            console.log(err);
            res.json({ data: null });
            console.log('HElllooo')
        }
        else {
            console.log(req.file.filename);
            res.json({ "status": 200, filename: req.file.filename, msg: { str1: 'SuccessFully Uploaded', str2: '' } });
        }
    });
}






module.exports.addUser = function (req, res, next) {
    console.log(req.body);
    var seeker = new Seeker(req.body);
    seeker.save().then((doc) => {
        res.json({ "status": 200, msg: { str1: 'SuccessFully Registered', str2: '' } });
    }).catch(err => res.json({ success: false, message: err.message, data: null }));
}





module.exports.loginUser = function (req, res, next) {
    let searchname = req.body.UserName;
    let passwordname = req.body.Password;
    console.log(req.body);

    Seeker.findOne({ UserName: searchname, Password: passwordname }, (err, obj) => {
        if (obj == null) {
            res.json({ "status": 404, msg: { str1: 'Incorrect Username or Password.', str2: 'User not found.' } });
        }
        else {

            jwt.sign({ UserId: obj._id }, 'secret', { expiresIn: 60 * 60 }, (err, token) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({
                        "status": 200, token: token, msg: {
                            str1: 'Successfully LoggedIn',
                            str2: ''
                        }
                    });
                }
            });
        }
    });
}

module.exports.userprofile = function (req, res, next) {

    console.log(req.token, "fgdfgdfgdfgdf");


    jwt.verify(req.token, 'secret', (err, authdata) => {
        if (err) {
            console.log(err);
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            console.log(authdata, "agaya")
            Seeker.find({ _id: authdata.UserId })
                .then((docs) => {
                    console.log(docs)
                    res.json({ status: 200, data: docs });
                })
                .catch(err => {
                    res.send(err);
                });
        }
    });

}

module.exports.updateprofile = function (req, res) {

    console.log(req.token, "fgdfgdfgdfgdf");


    jwt.verify(req.token, 'secret', (err, authdata) => {
        if (err) {
            console.log(err);
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            console.log(authdata, "agaya")
            Seeker.findOneAndUpdate({ "UserName": req.body.UserName }, req.body, (err, data) => {
                if (err) {
                    res.json({ "status": 404, msg: { str1: 'Failed to Update Seeker.', str2: '' } });
                }
                else {
                    res.json({
                        "status": 200, msg: {
                            str1: 'Successfully Updated Seeker',
                            str2: ''
                        }
                    });
                }
            })
        }
    });
}

module.exports.editprofile = function (req, res) {

    console.log(req.token, "fgdfgdfgdfgdf");


    jwt.verify(req.token, 'secret', (err, authdata) => {
        if (err) {
            console.log(err);
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            console.log(authdata, "agaya")
            Seeker.findOne(req.body, (err, data) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(data);
                }
            })
        }
    });

}
module.exports.companydata = function (req, res, next) {

    console.log(req.token, "fgdfgdfgdfgdf");
    jwt.verify(req.token, 'secret', (err, authdata) => {
        if (err) {
            console.log(err);
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            post.find({ appliedUsers_id: authdata.UserId })
                .populate('Provider_id', 'CompanyName CompanyDomain Email Address')
                .then((docs) => {
                    console.log(docs)
                    res.json({ status: 200, data: docs });
                })
                .catch(err => {
                    res.send(err);
                });
        }
    });

}