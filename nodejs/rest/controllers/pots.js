const fs=require("fs")
const GetUsers = JSON.parse(fs.readFileSync(".././users.json", "utf-8"));
module.exports.GetPots = (req, res) => {
	let product = req.params.productId;
	let DbProduct = GetUsers[0]["pots"][Number(product)];
	if (Number(product) >= 0) {
		res.status(200).json({
			status: "success",
			product: DbProduct,
		});
	} else {
		res.status(404).json({ status: "failure", product: product });
	}
};

