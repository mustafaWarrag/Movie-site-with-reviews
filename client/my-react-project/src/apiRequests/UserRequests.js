import axios from "axios";

export default class UserRequests {
    static async manageLogin(data) {
        let username = `\"${data.username}\"`;
        let password = `\"${data.password}\"`;

        const HANDLE_LOGIN = `#graphql
            mutation HandleLogin {
                handleLogin(username: ${username}, password: ${password}) {
                    token
                    username
                }
            }
        `
        return await axios({
            url:`https://movie-site-with-reviews.onrender.com/graphql/`,
            method:"post",
            data:{query:HANDLE_LOGIN}
        })
    }
    static async tokenAuth(token) {
        let tokenn = `\"${token}\"`;

        const TOKEN_VERIFY = `#graphql
            query TokenVerify {
                tokenVerify(token: ${tokenn}) {
                    user_id
                    username
                }
            }
        `
        return await axios({
            url:`https://movie-site-with-reviews.onrender.com/graphql/`,
            method:"post",
            data:{query:TOKEN_VERIFY}
        })
    }

    static async createUser(data) {
        let username = `\"${data.username}\"`;
        let password = `\"${data.password}\"`;
        
        const CREATE_USER = `#graphql
            mutation CreateUser {
                createUser(userdata: { username: ${username}, password: ${password} }) {
                    _id
                    username
                    password
                    error
                }
            }
        `;
        return await axios({
            url:"https://movie-site-with-reviews.onrender.com/graphql/",
            method:"post",
            data:{query:CREATE_USER}
        });
    }

    static async deleteUser(data) {
        let id = `\"${data.id}\"`;
        
        const DELETE_USER = `#graphql
            mutation DeleteUser {
                deleteUser(id: ${id}) {
                    _id
                    username
                    password
                }
            }
        `;
        return await axios({
            url:"https://movie-site-with-reviews.onrender.com/graphql/",
            method:"post",
            data:{query:DELETE_USER}
        });
    }
}