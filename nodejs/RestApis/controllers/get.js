/*===============Access================================
1.Id,keys,key_value
* find(No_Document)          ==> Get All Documents
* find(Document)             ==> Access matched same key,same value Documents
* find(Document,'name age')  ==> 1.select keys,values 
                                 2.in that selceted docs Access these keys

* findById(StrID)                 ==>Access All Matched Docs
* findById(StrID,'field1 field2') ==>Access All Matched Docs with these keys only
*/

/*find(noarguments)*/
/*find(selected_keyvalue_Docs)*/
module.exports.GetUsers=async(req,res,model)=>{
    
}
// find(docs,"key1 key2")
module.exports.GetUsersByParams=async(req,res,model)=>{
   
}
