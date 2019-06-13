module.exports=function verifyToken(req,res,next)
{
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if(typeof bearerHeader !== undefined)
    {
        
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token=bearerToken;
        console.log(req.token);
        next();
    }
    else{
        res.json({"status":403,msg: {str1:'Session Expired or Unauthorized access', str2: ''}})
    }
}




