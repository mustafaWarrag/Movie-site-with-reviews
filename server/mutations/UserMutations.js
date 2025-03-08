import bcrypt from "bcrypt";
import {GraphQLError} from "graphql"
import User from "../models/User.js";
import userServices from "../services/user.services.js";

const UserMutations = {
    async handleLogin(_, args) {
        try {
            let {username, password} = args;
            if (!username || !password) {
                throw new GraphQLError("Invaild Fields");
            }

            let {id, token} = await userServices.UserAuth(args);
            if (!token || token instanceof Error) {
                throw new GraphQLError("Invalid Credentials " + token);
            }
            return {username:username, id:id, token:token};
        } catch(err) {
            console.error("Unable to log in: " + err);
            return {error:err}
        }
    },

    async createUser(_, {userdata}) {
        try {
            let { username, password } = userdata;
            if (!username || !password) {
                throw new GraphQLError("Invaild Fields");
            }
            let userExists = await User.findOne({username:new String(username).toLowerCase()});
            if (userExists) {
                throw new GraphQLError("User already exists");
            }
            let salt = await bcrypt.genSalt(10);
            let hashedPass = await bcrypt.hash(password, salt);
            let newUser = new User({username:username, password:hashedPass});
            if (!newUser) {
                throw new GraphQLError("Invalid Sign Up Details");
            }
            await newUser.save();
            return newUser;
        } catch (err) {
            console.error("Unable To Create User:" + err);
            return {error:err}
        }
    },
    async deleteUser(_, args) {
        try {
            let id = args.id;
            if (!id) {
                throw new GraphQLError("no id provided");
            }
            if (!await (User.findOne({_id:id}))) {
                throw new GraphQLError("User may not exist");
            }
            let deleteDoc = await User.deleteOne({_id:id});
            if (!deleteDoc) {
                throw new GraphQLError("Invalid id");
            }
            return deleteDoc;
        } catch(err) {
            console.error("Unable to delete user" + err);
            return {error:err}
        }
    }
}
export default UserMutations;