// 1.middelware<===Routes <===controllers <===model <===server
//                                                         ==>.dotenv + moogose connection

const { MoviesModel } = require("../Model/MoviesModel.js");
console.log("controller")
exports.views=async(req,res)=>{
	
		res.render("code",{data:"satish",score:[1,2,3,4]})

}
exports.getHighestRatedMovies=async(req,res,next)=>{
	     console.log("hightestRatedMovies")
         req.limit="5"
		 req.sorted="-rating"
		 next()
}
exports.getAllMovies = async (req, res) => {
	let getAllMovies =MoviesModel.find();
    let sort=getAllMovies.sort(req.sorted);
	let limit=await sort.limit(req.limit);

	try{
           res.status(200).json({
			 status:"suceess",
			 Data:limit
		   })
	}
	catch(error){
		res.status(404).json({
			status:"un-suceess",
			errpr_msg:error.message
		  })
	}
	
	//get all movies :-
	// let GetMoives =  MoviesModel.find();
	// get condition matched movies :-
	// GetMoives = await GetMoives.and([{ name: "The Shawshank Redemptin"},{duration: 142}])
	// console.log(GetMoives)
	// try {
	// 	res.status(200).json({
	// 		status: "success",
	// 		data: GetMoives,
	// 	});
	// } catch (err) {
	// 	res.status(200).json({
	// 		status: 404,
	// 		message: err.message,
	// 	});
	// }
	// GetMoives = await MoviesModel.find({name:req.query.name,duration:req.query.duration*1})//get particular movie

	// GetMoives = await MoviesModel.find(req.query)//get particular movie

	// let projection={_id:0,name:1,directors:1}
	// GetMoives = await MoviesModel.find(req.query,projection)//get particular movie

	// GetMoives = await MoviesModel.find().where("key").equals(req.query.value)
	// GetMoives = await MoviesModel.find().where("name").equals(req.query.name)//get particular movie
	//                                     .where("duration").equals(req.query.duration*1)

	//==============================filtring======================================
	// let Stringify_query=JSON.stringify(req.query);//===>1way
	// Stringify_query=Stringify_query.replace(/gte|lte|eq|gt|lt/g,(match)=>`$${match}`)
	// console.log(Stringify_query)
	// let GetMoives = await MoviesModel.find(JSON.parse(Stringify_query)).limit(3)  //===>1way

	// let { duration, ratings}=req.query //===>2way (send string in functions)
	// let GetMoives = await MoviesModel.find().where("duration").gte(duration.gte)
	// 									       .where("ratings").gte(ratings.gte)
	//============================sorting======================================

	// let sortQueries=(req.query.sort.replace(/,/g,(arg)=>" "));
	// console.log(req.query)
	// console.log(sortQueries)
	// let GetMoives = await MoviesModel.find().sort(sortQueries)
	//===========================select ==> choose particlur field in client====================================
	// let QuerieString=(req.query.select.replace(/,/g,(arg)=>" "));
	// //Note:-"duration,ratings,totalRating" ======>convert into ===> "duration ratings totalRating"
	// let GetMoives = await MoviesModel.find().select(QuerieString)
	// try {
	// 	res.status(200).json({
	// 		status: "success",
	// 		count: GetMoives.length,
	// 		data: GetMoives,
	// 	});
	// } catch (err) {
	// 	res.status(200).json({
	// 		status: 404,
	// 		message: err.message,
	// 	});
	// }
	
	//========================pagenation============================
	// let page = req.query.page; //===>1
	// let limit = req.query.limit; //===>10
	// let skip_items_count = Number(page) - 1;
	// let Document_acess_no = Number(limit) * Number(page);
	// let Total_DB_Docs = await MoviesModel.countDocuments();
	// if (Document_acess_no <= Total_DB_Docs) {
	// 	try {
	// 		let movies = await MoviesModel.find()
	// 			.skip(skip_items_count)
	// 			.limit(Document_acess_no);

	// 		res.status(200).json({
	// 			status: "success",
	// 			count: movies.length,
	// 			Data: movies,
	// 		});
	// 	} catch (err) {
	// 		res.status(404).json({ ErrorMessage: err.message });
	// 	}
	// } else {
	// 	res.status(404).json({ ErrorMessage: "no Data Occur" });
	// }
};
exports.getMovie = async (req, res) => {
	let GetMoives = await MoviesModel.findById(req.params.id);
	try {
		res.status(200).json({
			status: "success",
			data: GetMoives,
		});
	} catch (err) {
		res.status(200).json({
			status: 404,
			message: err.message,
		});
	}
};
exports.validateBody = (req, res, next) => {};

exports.createMovie = async (req, res) => {
	console.log("create", req.body);
	try {
		const PostMovie = await MoviesModel.create(req.body);
		res.status(200).json({
			status: "success",
			data: {
				movie: PostMovie,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.updateMovie = async (req, res) => {
	try {
		let matched_Id_key = req.params.id;
		let New_Document = req.body;
		//Note:-runValidators:-validators return proper msg
		let ReturnCreateObject = { new: true, runValidators: true }; 
		const UpdatedMovie = await MoviesModel.findByIdAndUpdate(
			matched_Id_key,
			New_Document,
			ReturnCreateObject,
		);
		res.status(200).json({
			status: "success",
			data: {UpdatedMovie},
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.deleteMovie = async (req, res) => {
	await MoviesModel.findByIdAndDelete(req.params.id);
	try {
		res.status(204).json({
			status: "success",
			data: null,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err.message,
		});
	}
};


