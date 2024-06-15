
const AsyncErrorHandler=require("../utils/asyncErrors.js")
const CustomError=require("../utils/CustomError.js")
const {MoviesModelApi:MoviesModel}=require("../model/MoviesModel.js")

/************************** Get By Id *********************************/
module.exports.GetMoviesById = AsyncErrorHandler(async (req, res,next) => {
		const GetMovieById = await MoviesModel.findById(req.params.id);
		if(!GetMovieById){
           const Error=new CustomError(`Movie with ID is not found !`,404);
           return next(Error)
        }
        res.json({
			message: "status success",
			status: 200,
			DBObject: GetMovieById,
			method: "Get By Id",
			DBlength: GetMovieById.length,
		});
	}
);
/************************** Delete By Id ************************************/
module.exports.DeleteMoviesById =AsyncErrorHandler(async (req, res,next) => {
        const DeleteMoviesById = await MoviesModel.findByIdAndDelete(req.params.id);   
        if(!DeleteMoviesById){
            const Error=new CustomError(`Movie with ID is not found !`,404);
            return next(Error)
         }
        res.json({
            message: "status success",
            status: 200,
            DBObject: DeleteMoviesById,
            method: "Delete By Id",
        });
   
})
/************************** Update By Id **********************************/
module.exports.UpdateMoviesById = AsyncErrorHandler(async (req, res,next) => {
        const UpdateMovieById = await MoviesModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if(!UpdateMovieById){
            const Error=new CustomError(`Movie with ID is not found !`,404);
            next(Error)
         } 
        res.json({
            message: "status success",
            status: 200,
            DBObject: UpdateMovieById,
            method: "update By Id"
        });
  
})

//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';

ReactDOM.render(<Main />, document.getElementById('root'));






