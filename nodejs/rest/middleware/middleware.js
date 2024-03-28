const {server,Router}=require("../router/routes.js")
const morgan=require("morgan")
if(process.env.Node_Environment==="develeopment"){
    server.use(morgan("dev"));

}
server.use("/api/v1",Router)
server.use((req,res,next)=>{
    res.send("<h1>satish</h1>")
    next()
})

exports.server=server