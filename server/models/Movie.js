import db from "../config/db.js";
const Movie = db.model("Movie",{
    plot:String,
    genres:{type:[String], index:true},
    runtime:Number,
    cast:{type:[String], index:true},
    num_mflix_comments:Number,
    poster:String,
    title:String,
    lastupdated:String,
    languages:{type:[String], index:true},
    released:Date,
    directors:{type:[String], index:true},
    writers:{type:[String], index:true},
    awards:Object,
    year:Number,
    imdb:Object,
    countries:{type:[String], index:true},
    type:String,
    tomatoes:Object
}, "movies");

export default Movie;