const { promises } = require("nodemailer/lib/xoauth2/index.js")
const UserModel=require("../model/usermodel.js")
const AsyncErrorHandler=require("../utils/asyncErrors.js")
const customError=require("../utils/CustomError.js")
const Jwt=require("jsonwebtoken")


const Signtoken=(payload)=>{
    return Jwt.sign(payload,process.env.JwtSecretString,{
        expiresIn:process.env.TokenExpries
    })
    
}
module.exports.Signup=AsyncErrorHandler(async(req,res,next)=>{
    const newUser=await UserModel.create(req.body)
    const payload={id_:newUser.id}

    res.status(200).json({
        status:"success",
        token:Signtoken(payload),
        data:{user:newUser}
    })

})

module.exports.GetAllSignupDetails=AsyncErrorHandler(async(req,res,next)=>{
    const newUser=await UserModel.find()
    res.status(200).json({
        status:"success",
        data:{user:newUser}
    })

})

module.exports.Login = AsyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        let error = new customError("Please provide both email and password", 400);
        return next(error);
    }

    try {
        // Find user by email and include the password in the result
        const UserDocument = await UserModel.findOne({ email }).select("+password");
        const DBpassword=UserDocument.password

        if (!UserDocument) {
            const error = new customError("Invalid email or password", 400);
            return next(error);
        }

        // Use the instance method to compare passwords
        const isPasswordValid = await UserDocument.comparePasswordInDb(password,DBpassword);

        if (!isPasswordValid) {
            const error = new customError("Invalid email or password", 400);
            return next(error);
        }

        // Generate a token with the user's ID as the payload
        const token = Signtoken({id_:UserDocument.id});

        res.status(200).json({
            status: "success",
            token,
            user: UserDocument
        });
    } 
    catch (error) {
        next(error);
    }
});

module.exports.ProtectRoutes=async(req,res,next)=>{
    //verify the user send Bearer Token 
    let Bearertoken=req.headers.authorization;
    let token;
    if(Bearertoken&&Bearertoken.startsWith("Bearer")){
           //split the Bearertoken ==> into required token str taken 
            token=Bearertoken.split(" ")[1]
    }
    if(!token){
        next(new customError("Authourization required !!",400))
    }
    // console.table(Jwt.verify(token, process.env.JwtSecretString),Jwt.decode(token))
    try {
        // Validate the user token using the secret key
        const validateToken = Jwt.verify(token, process.env.JwtSecretString);
        console.log(validateToken, "Token is valid");
        // Attach the decoded token to the request object
        req.user = validateToken;
        next();
    } catch (err) {
        console.error('Invalid token:', err.message);
        return next(new customError("Invalid or expired token", 401));
    }

}


/*

1.========================= /signup :- =============================
   1.take the unique user Deatils  eg:- email,password,conformPassword,gender<=== (post)
   2.Issue the new signed token 
   3.send ==> res.send ==>token ,storeduserDBDetails

2.======================== /login :- ===============================
  1.take the alredy DB stored users Details from client eg:- email,password <== (post)
  2.by using  user email ==> get the Document 
  3.compare get DocumentPassword === UserPassword 
  4.again issue the ==>new created token
  5.res.send ==> token,GetDBstoredDetails

  Note :- ekkada token post cheyaledu ==> that why ekkada DBtoken === usertoken compare cheyalemu
 
3.======================== /api/v1/movies :-Access the premission Route using token ===============================
  1.take the alredy issued singed token from client  eg:- req.Auth.token="hfgj686768thjgvb"
  2.compare the user post Token by using previous generated secrect string  ==> return {id,ist,ext}
  3.using return id ==> check if the particular user id avliblee or not in our Database 
                     1.support if the user avalibele ==>return particular Doc  
                     2. else ==> return undefined
  4.if the user Details stored in our Databse next check the Which time issue the user send token 



*/











