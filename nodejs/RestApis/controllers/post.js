const status = require("statuses")

//===============create================================
module.exports.CreateOneToMany = async (req, res, model) => {
    try {
        let object = await model.create(req.body);
        res.json({
            status: "success",
            method: "create",
            data: object
        });
    } catch (error) {
        res.json({
            status: "failure",
            method: "create",
            message: error.message
        });
    }
};



