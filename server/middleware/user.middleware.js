import jwt from "jsonwebtoken";
import userServices from "../services/user.services.js";
//import crypto from "crypto"
//console.log(crypto.randomBytes(32).toString("hex"));

const userMiddleware = {
    async tokenVerify(token) {
        if (!token) {
            return new Error("Token does not exist");
        }
        let data;
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return new Error(err.message);
            }
            //if (decoded.exp)
            data = decoded;
        })
        return data;
    }
};
export default userMiddleware;