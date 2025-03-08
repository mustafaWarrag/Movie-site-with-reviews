import db from "../config/db.js";
import cuid2 from "@paralleldrive/cuid2"
const userSchema = new db.Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
}, {
    _id:{type:String, default:cuid2.createId()},
})
const User = db.model("User", userSchema, "my_users");

export default User;