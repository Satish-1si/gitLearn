const express = require("express");
const server = express();
const fs = require("fs").promises; // Import fs.promises for async operations

let filehandle=async()=>{
          let result;
          try{
            result=await fs.open('data.txt', '')
            result?.close()
            console.log(result)
          }
          catch(err){
            console.log(err)

          }
}
filehandle()

// Start the server
server.listen(3678, () => {
    console.log(`Server listening on port 3678`);
});
