const Seeker = require('../config/models/JobSeekerSchema');
var multer = require('multer');
var path = require('path');
var jwt = require('jsonwebtoken');
var Provider = require('../config/models/JobProvider');
var post = require('../config/models/post');
var objectId = require('mongoose').Types.ObjectId;
var mailer = require('../config/mailer');

module.exports.addUser = function (req, res, next) {
    console.log(req.body);
    var provider = new Provider(req.body);
    provider.save().then((doc) => {
        res.json({ "status": 200, msg: { str1: 'SuccessFully Registered', str2: '' } });
    }).catch(err => res.json({ success: 404, message: err.message, data: null }));
}




module.exports.loginUser = function (req, res, next) {
    let searchname = req.body.CompanyName;
    let passwordname = req.body.Password;
    console.log(req.body);

    Provider.findOne({ CompanyName: searchname, Password: passwordname }, (err, obj) => {
        if (obj == null) {
            res.json({ "status": 404, msg: { str1: 'Incorrect Username or Password.', str2: 'User not found.' } });
        }
        else {

            jwt.sign({ UserId: obj._id }, 'TopSecret', { expiresIn: 60 * 60 }, (err, token) => {
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


module.exports.addPost = function (req, res, next) {

    jwt.verify(req.token, 'TopSecret', (err, authdata) => {
        if (err) {
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            console.log("hello");

            req.body.Provider_id = objectId(authdata.UserId);
            var postadd = new post(req.body);
            postadd.save().then((docs) => {
                console.log(docs);
                res.json({ status: 200, msg: { str1: 'Successfuly Added Post', str2: '' } });
            })
                .catch((err) => {
                    console.log(err);
                })

        }
    });

}


module.exports.getproviderPosts = function (req, res, next) {

    jwt.verify(req.token, 'TopSecret', (err, authdata) => {
        if (err) {
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            post.find({ "Provider_id": authdata.UserId }).sort({ createdAt: -1 })
                .then((docs) => {
                    res.json({ "status": 200, data: docs });
                })
                .catch((err) => {
                    res.json({ "status": 404 });
                    rs.end(err);
                })
        }

    });
}


module.exports.deletePost = function (req, res, next) {
    console.log("dsdfs");
    jwt.verify(req.token, 'TopSecret', (err, authdata) => {
        if (err) {
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            post.findByIdAndDelete(req.params._id).then(docs => {
                return post.find({ "Provider_id": authdata.UserId });

            })
                .then((Data) => {
                    res.json({ "status": 200, data: Data, msg: { str1: 'Post Successfully Deleted', str2: '' } });
                })
                .catch((err) => {
                    res.json({ "status": 404 });
                    rs.end(err);
                })
        }

    });
}


module.exports.getallPosts = function (req, res, next) {
    post.find({}).populate('Provider_id').sort({ createdAt: -1 })
        .then(docs => {
            // console.log(docs);
            res.json({ "status": 200, data: docs })
        })
        .catch((err) => {
            res.json({ "status": 404 });
            rs.end(err);
        })
}


module.exports.getPost = function (req, res, next) {



    post.findOne(req.body).populate('Provider_id').sort({ createdAt: -1 })
        .then(docs => {
            console.log(docs);
            res.json({ "status": 200, data: docs })
        })
        .catch((err) => {
            res.json({ "status": 404 });
            rs.end(err);
        })

}






module.exports.applyPost = function (req, res, next) {
    console.log("hello");
    jwt.verify(req.token, 'secret', (err, authdata) => {
        if (err) {
            console.log(err);
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            console.log(req.body._id);
            post.findOne({ _id: req.body._id, appliedUsers_id: authdata.UserId })

                .then((docs) => {
                    if (docs) {
                        console.log("user already exist");
                        res.json({ "status": 409, msg: { str1: 'User already Applied', str2: '' } })
                    }
                    else if (!docs) {

                        post.findByIdAndUpdate(req.body._id, { "$push": { "appliedUsers_id": authdata.UserId }, "$inc": { 'count': 1 } })
                            .populate('Provider_id', 'Email -_id')
                            .then(docs => {
                                console.log(docs, "dsadasdsffhkgndfjghdfjndfjkghdfgdfjkgh");
                                try {
                                    mailer.sendMail(docs.Provider_id.Email, docs.JobTitle);
                                } catch (e) {
                                    console.log(e);   // uncaught
                                }

                                res.json({ "status": 200, msg: { str1: 'SuccessFully Applied', str2: '' } })

                            })
                            .catch((err) => {

                                res.end(err);
                            })
                    }
                });
        }
    })
}



module.exports.usersdata = function (req, res, next) {

    console.log(req.token, "fgdfgdfgdfgdf");
    jwt.verify(req.token, 'TopSecret', (err, authdata) => {
        if (err) {
            console.log(err);
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            post.find({ Provider_id: authdata.UserId })
                .populate('appliedUsers_id', 'FirstName LastName Phone Resume Skills Experience Email')
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



module.exports.searchSkill = function (req, res, next) {

    console.log(req.body, "sdadsdsd");


    var condition = {
        '$or': [
            { "JobTitle": { $regex: req.body.Search, $options: 'i m' } },
            {
                "SkillsRequire": { $regex: req.body.Search, $options: 'i m' }
            }]
    }

    console.log("conso", condition);
    post.find(condition)
        .populate('Provider_id', 'CompanyName')
        .then((docs) => {
            if (docs.length !== 0) {

                res.json({ "status": 200, data: docs });
            }
            else {
                res.json({ "status": 404 });
            }
        })
        .catch(err => {
            res.send(err);
        });

}

module.exports.companyprofile = function (req, res, next) {

    console.log(req.token, "fgdfgdfgdfgdf");


    jwt.verify(req.token, 'TopSecret', (err, authdata) => {
        if (err) {
            console.log(err);
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            console.log(authdata, "agaya")
            Provider.find({ _id: authdata.UserId })
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

module.exports.editprofile = function(req, res)
{

    console.log(req.token, "fgdfgdfgdfgdf");


    jwt.verify(req.token, 'TopSecret', (err, authdata) => {
        if (err) {
            console.log(err);
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            console.log(authdata, "agaya")
            Provider.findOne(req.body,(err,data)=> {
                if(err)
                {
                    res.send(err);
                }
                else{
                    res.json(data);
                }
            })
        }
    });
   
}

module.exports.updateprofile = function(req, res)
{

    console.log(req.token, "fgdfgdfgdfgdf");


    jwt.verify(req.token, 'TopSecret', (err, authdata) => {
        if (err) {
            console.log(err);
            res.json({ "status": 403, msg: { str1: 'Session Expired or Unauthorized access', str2: '' } });
        }
        else {
            console.log(authdata, "agaya")
            Provider.findOneAndUpdate({"CompanyName":req.body.CompanyName},req.body,(err,data)=>
            {
                if(err)
                {
                    res.json({"status": 404,msg: {str1:'Failed to Update Provider.', str2: ''}});
                }
                else{
                    res.json({"status": 200, msg: {
                        str1: 'Successfully Updated Provider',
                        str2: ''
                        }});
                }
            })
        }
    });
    
}