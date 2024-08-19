const JWT = require('jsonwebtoken');
const JWT_SECRET = "AKSHILisagoodb$oy";


const fetchuser = (req,res,next) =>{
    // Get the user from JWT token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "please authenticate using a valid twoken"})
    }
    try {
        const data = JWT.verify(token, JWT_SECRET);
    req.user = data.user;
    next();         
    } catch (error) {
       return res.status(401).send({error: "please authenticate using a valid tokcen"})    }
                                                                    
} 

module.exports = fetchuser;