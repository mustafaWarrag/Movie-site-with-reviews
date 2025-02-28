import mongo, { MongoClient } from "mongodb"
import { configDotenv } from "dotenv";
import httpServer from "./server.js"

configDotenv();

let PORT = process.env.VITE_PORT;

async function main() {
    try {
        //app.listen(PORT, (req,res) => {
        //    console.log("listening in at " + PORT);
        //});
        httpServer.listen(PORT, (req, res) => {
            console.log("http server listening in at " + PORT);
        })
    } catch(err) {
        console.error("couldnt connect to client cuz:" + err);
    }

};
main();