const fs = require("fs");
const GetUsers = JSON.parse(fs.readFileSync("../users.json", "utf-8"));
const PostUsers = (path, postobject) => {
	fs.writeFileSync(path, postobject);
};

exports.GetBricks = (req, res,next) => {
	let product = req.params.productId;
	let DbProduct = GetUsers[0]["Bricks"][Number(product)];
	if (Number(product) >= 0) {
		res.status(200).json({
			status: "success",
			product: DbProduct,
		});
		next()
	} else {
		res.status(404).json({ status: "failure", product: product });
	}
};

exports.postBricks = (req, res,next) => {
	const body = req.body;
	const Bricksobjects = GetUsers[0]["Bricks"].filter(({ name }) => {
		return name !== body.name;
	});
	let previousBuildNo = Bricksobjects[Bricksobjects.length - 1].BuildNo;
	const AddBrickObj = Object.assign(body, {
		productId: Bricksobjects.length,
		BuildNo: previousBuildNo + 1,
	});
	const BricksArray = [...Bricksobjects, AddBrickObj];
	let UpdateJsonObject = Object.assign(GetUsers[0], {
		Bricks: BricksArray,
	});
	PostUsers("../users.json", JSON.stringify([UpdateJsonObject]));
	if (Bricksobjects.length !== 0) {
		res.status(200).json({
			status: "success",
			count: BricksArray.length,
			Bricks: BricksArray,
		});
		next();

	} else {
		res.status(404).json({
			status: "unsuccess",
			ErrorMsg: "please post the valid Details",
		});
	}
};

exports.putBricks = (req, res) => {
	const body = req.body;
	const clientId = req.params.index;
	const findobject = GetUsers[0]["Bricks"].findIndex((object) => {
		if (object.productId === Number(clientId)) {
			return object;
		}
	});
	const BricksArray = GetUsers[0]["Bricks"];
	const updatedObject = { ...BricksArray[Number(findobject)], ...body };
	BricksArray[Number(findobject)] = updatedObject;
	let UpdateJsonObject = Object.assign(GetUsers[0], {
		Bricks: BricksArray,
	});
	PostUsers("../users.json", JSON.stringify([UpdateJsonObject]));
	if (findobject !== -1) {
		res.status(200).json({
			status: `successfully_updated_${clientId}`,
			count: BricksArray.length,
			Bricks: BricksArray,
		});
		next();
	} else {
		res.status(404).json({
			status: "unsuccess",
			ErrorMsg: "please Hit the proper Index",
		});
	}
};


exports.DeleteBricks = (req, res,next) => {
	const clientId = req.params.index;
	const findobject = GetUsers[0]["Bricks"].filter((object) => {
		if (object.productId !== Number(clientId)) {
			return object;
		}
	});
	let UpdateJsonObject = Object.assign(GetUsers[0], {
		Bricks: findobject,
	});
	PostUsers("../users.json", JSON.stringify([UpdateJsonObject]));
	if (findobject !== -1) {
		res.status(200).json({
			status: `successfully_Delete_${clientId}`,
			count: findobject.length,
			Bricks: findobject,
		});
		next();
	} else {
		res.status(404).json({
			status: "unsuccess",
			ErrorMsg: "please Hit the proper Index",
		});
	}
};
