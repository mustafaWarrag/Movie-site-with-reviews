import axios from "axios";

export default class ReviewRequests {
    static async getReviews() {
        const GET_REVIEWS = `#graphql
            query GetReviews {
                getReviews {
                    _id
                    user_id
                    username
                    review
                    movie_id
                    stars
                    date
                }
            }
        `;
        return await axios({
            url:`http://localhost:8080/graphql`,
            method:"post",
            data:{query:GET_REVIEWS}
        });
    }
    static async getReviewsByUser(data) {
        let username = `\"${data.username}\"`;
        let page = data.page;
        let num = data.num;

        const GET_REVIEWS_BY_USER = `#graphql
            query GetReviewsByUser {
                getReviewsByUser(username: ${username}, page: ${page}, num: ${num}) {
                    _id
                    user_id
                    username
                    review
                    movie_id
                    stars
                    date
                }
            }
        `;
        return await axios({
            url:`http://localhost:8080/graphql`,
            method:"post",
            data:{query:GET_REVIEWS_BY_USER}
        });
    }
    
    static async addReview(data) {
        let username = `\"${data.username}\"`;
        let review = `\"${data.review}\"`;
        let movieId = `\"${data.movieId}\"`;
        let stars = data.stars;

        const ADD_REVIEW = `#graphql
            mutation CreateReview {
                createReview(
                    input: {
                        username: ${username}
                        review: ${review}
                        movie_id: ${movieId}
                        date: null
                        stars: ${stars}
                    }
                ) {
                    _id
                    user_id
                    username
                    review
                    movie_id
                    stars
                    date
                }
            }
        `
        return await axios({
            url:`http://localhost:8080/graphql`,
            method:"post",
            data:{query:ADD_REVIEW}
        });
        //return await axios.post(`http://localhost:8080/api/v1/movies/reviews`, data);
    }
    static async updateReview(data) {
        let id = `\"${data.id}\"`;
        let review = `\"${data.review}\"`;

        const UPDATE_REVIEW = `#graphql
            mutation UpdateReview {
                updateReview(review: ${review}, id: ${id}) {
                    _id
                    user_id
                    username
                    review
                    movie_id
                    stars
                    date
                }
            }   
        `;
         return await axios({
            url:`http://localhost:8080/graphql`,
            method:"post",
            data:{query:UPDATE_REVIEW}
        });
        //return await axios.put(`http://localhost:8080/api/v1/movies/reviews`, data);
        
    }
    static async deleteReview(data) {
        let reviewId = `\"${data.id}\"`;
        //let userId = `\"${data.userId}\"`;

        const DELETE_REVIEW = `#graphql
            mutation DeleteReview {
                deleteReview(id: ${reviewId}) {
                    _id
                    user_id
                    username
                    review
                    movie_id
                    stars
                    date
                }
            }
        `;
         return await axios({
            url:`http://localhost:8080/graphql`,
            method:"post",
            data:{query:DELETE_REVIEW}
        });
        /*
        return await axios.delete(`http://localhost:8080/api/v1/movies/reviews`,
            {data:{userId:userId, reviewId:id}}
        );
        */
        
    }
}