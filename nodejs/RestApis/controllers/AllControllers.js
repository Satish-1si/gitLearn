const fs=require("fs")
const Path=require("path")
const  ControllersPath=Path.resolve(Path.resolve("..",Path.join("controllers")))
const GetControllersFiles=fs.readdirSync(ControllersPath)
const index=GetControllersFiles.indexOf("AllControllers.js")
GetControllersFiles.splice(index,1)
let AllObjects={}
const AllFiles=GetControllersFiles.map((item)=>{
     const filepath=Path.join(ControllersPath,item)
     const ReadFile=require(filepath)
     console.log(ReadFile)
     Object.assign(AllObjects,ReadFile)
})
console.log(AllObjects)
module.exports=AllObjects



