import express from "express"
import cors from "cors";
import morgan from "morgan";
import { configDotenv } from "dotenv";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from "@apollo/server/express4"
import http from "http"

import apollo from "./graphQLmain.js";
//import router from "./routers/movies.routes.js";

let app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//app.all("/graphql", createHandler({schema:schema}))

configDotenv();
let PORT = process.env.VITE_PORT || 8080;

//app.use("/api/v1/movies", router);

app.get("*", (req, res) => {
    res.status(404).json({error:"page not found"});
});

let httpServer = http.createServer(app);
apollo.addPlugin([ApolloServerPluginDrainHttpServer({httpServer})]);
await apollo.start();
app.use(expressMiddleware(apollo));
//await new Promise((resolve)=> httpServer.listen({port:8081}, resolve));

//export default app;
export default httpServer;