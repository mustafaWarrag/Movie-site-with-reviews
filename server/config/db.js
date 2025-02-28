import db from "mongoose"

import { configDotenv } from "dotenv";
configDotenv();

await db.connect(process.env.MOVIES_MONGO_CLUSTER_URL).then(()=>{
    console.log("connected to database!");
}).catch((err)=>{
    console.error("Unable to connect to database " + err)
});
export default db;