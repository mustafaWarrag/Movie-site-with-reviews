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
                        username
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
    static async searchForMovie(data, page=0, num=4) {
        let rated = data.rated === null? null : `\"${data.rated}\"`;
        let title = `\"${data.title}\"`;
        const SEARCH_FOR_MOVIE = `#graphql
            query SearchForMovieByFilter {
                searchForMovieByFilter(page: ${page}, num: ${num}, rated: ${rated}, title: ${title}) {
                    movies {
                        _id
                        title
                        plot
                        genres
                        cast
                        poster
                        runtime
                        rated
                    }
                    totalNumOfMovies
                }
            }
        `;
        return await axios({
            url:`http://localhost:8080/graphql/`,
            method:"post",
            data:{query:SEARCH_FOR_MOVIE}
        })
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
}
