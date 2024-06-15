const fs=require("fs")
const path=require("path")

const GEtAllFiles=fs.readdirSync(path.resolve(__dirname))
let AllMethods={}
GEtAllFiles.forEach((file)=>{
     if("AllControllers.js"!==file){
        let method= require(path.join(__dirname,file))
        Object.assign(AllMethods,method)
      }
})
module.exports=AllMethods;

