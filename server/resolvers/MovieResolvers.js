import { ObjectId } from "mongodb"

import Movie from "../models/Movie.js"
const MovieResolvers = {
    async getMovies(parent, args) {
        let filter = {};
        let num = parseInt(args.num)? parseInt(args.num) : 5;
        let page = parseInt(args.page)? parseInt(args.page) : 0
        if (args.filter) {
            filter = {$text:{$search:args.filter}}
        }
        let list = await Movie
                          .find(filter)
                          .limit(num)
                          .skip(page);
        if (!list) {
            return {error:"Movie not found"}
        }
        return list
    },
    async getMovieById(parent, args) {
        let movieFields = await Movie.aggregate([
            {$match:{_id:ObjectId.createFromHexString(args.id)}},
            {$lookup: {
                from:"reviews",
                localField:"_id",
                foreignField:"movie_id",
                as:"reviews",
            }}
        ])
        if (!movieFields) {
            return {error:"Movie not found"}
        }
        
        return movieFields
    },

    async getRatings() {
        return await Movie.distinct("rated")
    },

    async getGenres() {
        return await Movie.distinct("genres")
    }
}

export default MovieResolvers