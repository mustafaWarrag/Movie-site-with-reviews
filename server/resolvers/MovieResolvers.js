import {GraphQLError} from "graphql";
import { ObjectId } from "mongodb"

import Movie from "../models/Movie.js"
const MovieResolvers = {
    async getMovies(parent, args) {
        try {
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
                throw new GraphQLError("Movie not found");
            }
            return list
        } catch(err) {
            console.error("Unable to get movies: " + err);
            return {error:err};
        }
    },
    async getMovieById(parent, args) {
        try {
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
                throw new GraphQLError("Movie not found");
            }
            return movieFields
        } catch(err) {
            console.error("Unable to get movie by id: " + err);
            return {error:err};
        }
    },
    async searchForMovieByFilter(_, args) {
        try {
            let filter = {};
            let num = parseInt(args.num)? parseInt(args.num) : 4;
            let page = parseInt(args.page)? parseInt(args.page) : 0;
            let {rated, title} = args;
            if (!rated || rated === "") {
                rated = null
            }
            if (title) {
                //filter = {$text:{$search:title}};
                filter.$text = {$search:title}
            }
            let movieList = await Movie.find(filter)
                                        .and({rated:{$eq:rated}})
                                        .limit(num)
                                        .skip(page*num);
            let totalNumOfMovies = await Movie.countDocuments(filter).and({rated:{$eq:rated}});
            return {movies:movieList, totalNumOfMovies:totalNumOfMovies};

        } catch(err) {
            console.error("Query invalid:" + err);
            return {error:err}
        }
    },

    async getRatings() {
        return await Movie.distinct("rated")
    },

    async getGenres() {
        return await Movie.distinct("genres")
    }
}

export default MovieResolvers