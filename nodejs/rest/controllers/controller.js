module.exports.studentElegible=(req,res,next)=>{
    const {Elegible}=req.params;
    if(Elegible==="inter"){
        console.log(Elegible)
        req.premission=true
        next()
    }
    else{
        res.status(404).json({status:"unSuccessfull",Admission:"not-conform"})
    }
    
}
module.exports.fee=(req,res,next)=>{
    const {fee}=req.params;
    if(req.premission===true && Number(fee)>=20000){
        console.log(fee)
        req.premission=true
        next()
    }
    else{
        res.status(404).json({status:"unSuccessfull",Admission:"not-conform"})
    }
}
module.exports.Degree=(req,res,next)=>{
    const {ChooseDegree}=req.params;
    const DegreesList=["civil","MECH","EEE","ECE","IT","CSE"]
    const MatchDegree=DegreesList.some((degree)=>degree===ChooseDegree)
    if(req.premission===true && MatchDegree){
       console.log(ChooseDegree)
       req.premission="granted"
       next()
    }
    else{
        res.status(404).json({status:"unSuccessfull",Admission:"not-conform"})
    }
}
module.exports.premission=(req,res,next)=>{
    const {ChooseDegree,Elegible,fee}=req.params;
    if(req.premission==="granted"){
        res.status(200).json({status:"success",Admission:"success",branch:ChooseDegree,AnualFee:fee,Elegiblity:Elegible});
    }
    else{
        res.status(404).json({status:"unSuccessfull",Admission:"not-conform"})
    }
}


