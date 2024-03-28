const {server}=require("../middleware/middleware.js");

let serverPort;
if(process.env.Node_Environment==="develeopment"){
    serverPort=process.env.PORT
}
let port=serverPort || 3332;
server.listen(port,()=>{
    console.log(`server loading at : ${port}`)
})