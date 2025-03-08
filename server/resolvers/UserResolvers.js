
import {GraphQLError} from "graphql"

import User from "../models/User.js";
import userServices from "../services/user.services.js";
import userMiddleware from "../middleware/user.middleware.js";

const UserResolvers = {
    async getUsers(_, args) {
        try {
            let page = parseInt(args.page)? parseInt(args.page) : 0;
            let num = parseInt(args.num)? parseInt(args.num) : 5
            let users = User.find({})
                            .skip(page)
                            .limit(num);
            return users;
        } catch(err) {
            console.error("Unable to get users:" + err);
            return {error:err};
        }
    },
    async tokenVerify(_, args) {
        try {
            let token = args.token;
            if (!token) {
                throw new GraphQLError("Missing token");
            }
            let data = await userMiddleware.tokenVerify(token);
            //console.log(id);
            if (!data || data instanceof Error) {
                throw new GraphQLError(data);
            }
            
            return {username:data.username, user_id:data.userId};
        } catch(err) {
             console.error("Bad token: " + err);
             return {error:err};
        }
    }
}

export default UserResolvers;