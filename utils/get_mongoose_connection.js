const mongoose= require('mongoose')
const config= require("../config.json")


function get_mongoose_connection() {
    return new Promise(async(resolve, reject)=>{
        try {
            const url = config.mongoDb.mongoURI;
            const db= config.mongoDb.db

            const db_url= url + "/" + db

            console.log("mongodb url: ", db_url)

            mongoose.connect(db_url, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            })
            .then(() => {
                console.log("mondodb connection successful ✔")
                resolve()})
            .catch((err) => reject(err));
   
            
            } catch (error) {
                reject(error);
            }
    })   
}

module.exports= get_mongoose_connection
