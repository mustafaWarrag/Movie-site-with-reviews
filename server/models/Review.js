import cuid2 from "@paralleldrive/cuid2";
import { ObjectId } from "mongodb";

import db from "../config/db.js";

const Review = db.model("Review", {
    //_id:{type:ObjectId, default:ObjectId.createFromHexstring()} //handled by Mongodb 
    username:{type:String, required:true},
    user_id:{type:String, required:true},
    date:{type:Date, default:new Date()},
    review:{type:String, required:true},
    movie_id:{type:ObjectId, required:true},
    stars:{type:Number, required:true}
}, "reviews");

export default Review;