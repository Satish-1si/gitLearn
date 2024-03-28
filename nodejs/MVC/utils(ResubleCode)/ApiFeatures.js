class ApiFeatures{
     constructor(AllDocs,parametersStr){
           this.AllDocs=AllDocs;
           this.client_paramts_str=parametersStr;
     }
     sort(){
        //convert into string object
        let Stringify_query=JSON.stringify(this.client_paramts_str.sort);
        //remove the , Dollar symbol :-
        let clientParameters=Stringify_query.replace(/,/g,(match)=>" ")
        //find the clientparameters matched Docs :- sorted  
        let sorted_Docs=this.AllDocs.sort(clientParameters);
        this.AllDocs=sorted_Docs;
        return this;
     }
     filter(){
        //convert into string object
        let Stringify_query=JSON.stringify(this.client_paramts_str);
        //add the $ Dollar symbol :-
        Stringify_query=Stringify_query.replace(/gte|lte|eq|gt|lt/g,(match)=>`$${match}`)
        // and then after convert into normal object
        let clientParameters= JSON.parse(Stringify_query) 
        //find the clientparameters matched Docs :- 
        let matchedDocs=this.AllDocs.find(clientParameters)
        this.AllDocs=matchedDocs
        return this
     }
     limit(){

     }
     count(){

     }
     select(){

     }
     pagenation(){

     }

}