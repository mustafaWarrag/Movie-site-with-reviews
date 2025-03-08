import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/User.js";

const userServices = {
    async isMatch(plainText, encrypted) {
        return await bcrypt.compare(plainText, encrypted)
    },
    async UserAuth(userdata) {
        let name = userdata.username;
        let password = userdata.password;
        let doc = await User.findOne({username:name});
        if (!doc) {
            return new Error("User does not exist in the database");
        }
        let encryptedPass = await doc.get("password");
        let id = await doc.get("_id");

        if (!await (this.isMatch(password, encryptedPass))) {
            return new Error("Invalid Credentails");
        }
        const token = jwt.sign({userId:id, username:name}, process.env.JWT_SECRET_KEY, {algorithm:"HS256", expiresIn:"4h"})
        return {id, token};
    }

}

export default userServices