const AsyncErrorHandler=require("../utils/asyncErrors.js")
const {MoviesModelApi:MoviesModel}=require("../model/MoviesModel.js")

/************************** create ******************************/
module.exports.createMovies = AsyncErrorHandler(async (req,res,next) => {
    const createMovies = await MoviesModel.create(req.body);
    res.json({
            message: "status success",
            status: 200,
            DBData: createMovies,
            method:"Post"
        });
})
/***************************** Get ************************************************/
module.exports.GetAllMovies= AsyncErrorHandler(async (req, res,next) => {
    const GetAllMovies = await MoviesModel.find();
        res.json({
            message: "status success",
            status: 200,
            DB: GetAllMovies,
            method:"Get All movies",
            DBlength:GetAllMovies.length
        });
})


