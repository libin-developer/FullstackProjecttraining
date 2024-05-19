const jwt =require('jsonwebtoken')
const secretkey = 'sssdfg@hjs'

const verifytoken=(req,res,next)=>{
    if(!req.headers['authorization']){
    return next(Error(403,'unauthorised'))
    }
    let token =req.headers["authorization"]
    
    if (!token) {
        return next(new Error(400, "unauthorized"))
    }

    jwt.verify(token,secretkey,(err, payload) => {
        if (err)  return next(new Error(400,'unauthorized'))
        req.payload =payload
        next();
    });

}
module.exports =verifytoken