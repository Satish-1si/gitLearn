
const { MoviesModel } = require("../Model/MoviesModel.js");

let GetMovies =async(arg)=>arg?MoviesModel.find(arg):MoviesModel.find()

exports.GetAllMovies=async(req,res)=>{
    let GetAllMovies=await GetMovies();
    try{
        res.status(200).json({
            status:"success",
            GetData:GetAllMovies
        })
    }
    catch(error){
         res.status(404).json({
            status:"unsuccess",
            Error_Msg:error.message
         })
    }

}
exports.GetMovie=async(req,res)=>{
    
}
exports.GetMovies_using_params=async(req,res)=>{
    
}
exports.GetMovies_using_query=async(req,res)=>{
    
}
exports.GetMovies_using_reletional=async(req,res)=>{
    
}
exports.GetMovies_using_logical=async(req,res)=>{
    
}
exports.GetMovies_select_fields=async(req,res)=>{
    
}
exports.GetMovies_sort_fields=async(req,res)=>{
    
}
exports.pagenation=async(req,res)=>{
    
}
exports.Route_alising=async(req,res)=>{
    
}


