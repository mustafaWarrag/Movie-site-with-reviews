import axios from "axios"
import { gql } from "@apollo/client";

export default class MovieRequests {
    static async getAll(page=0, num=3) {
        //return await axios.get(`http://localhost:8080/api/v1/movies?moviesPerPage=4&page=${page}/`);  
        const GET_MOVIES = `#graphql
                query GetMovies {
                    getMovies(filter: null, page: ${page}, num: ${num}) {
                        _id
                        plot
                        title
                        cast
                        runtime
                        genres
                        rated
                        poster
                    }
                }
            `;
            
        return await axios({
            url:`http://localhost:8080/graphql/`,
            method:"post",
            data:{query:GET_MOVIES}
    });
        
    }
    static async queryById(id) {
        //return await axios.get(`http://localhost:8080/api/v1/movies/id/${id}`);
        let stringId = `\"${id}\"`
        const GET_MOVIE_BY_ID = `#graphql
            query GetMovieById {
                getMovieById(id: ${stringId}) {
                    _id
                    title
                    plot
                    genres
                    cast
                    poster
                    runtime
                    rated
                    reviews {
                        _id
                        user_id
                        name
                        review
                        date
                        movie_id
                        stars
                    }
                }
            }
        `;
        return await axios({
            url:`http://localhost:8080/graphql/`,
            method:"post", 
            data:{query:GET_MOVIE_BY_ID}
        })
    }
    static async searchForMovie(query, by="title", page=0) {
        //return await axios.get(`http://localhost:8080/api/v1/movies?${by}=${query}&page=${page}&moviesPerPage=4`);
        
    }
    static async getRatings() {
        //return await axios.get(`http://localhost:8080/api/v1/movies/ratings`);
        const GET_RATINGS = `#graphql
            query GetRatings {
                    getRatings
            }
        `;
        return await axios({
            url:`http://localhost:8080/graphql/`, 
            method:"post",
            data:{query:GET_RATINGS}})
        
    }
    static async addReview(data) {
        try {
            return await axios.post(`http://localhost:8080/api/v1/movies/reviews`, data);
        } catch(err) {
            console.error("Unable to post review" + err);
            return
        }
    }
    static async updateReview(data) {
        try {
            return await axios.put(`http://localhost:8080/api/v1/movies/reviews`, data);
        } catch(err) {
            console.error("Unable to update review" + err);
            return
        }
    }
    static async deleteReview(id, userId) {
        try {
            return await axios.delete(`http://localhost:8080/api/v1/movies/reviews`,
                {data:{userId:userId, reviewId:id}}
            );
        } catch(err) {
            console.error("Unable to delete review" + err);
            return
        }
    }
}
