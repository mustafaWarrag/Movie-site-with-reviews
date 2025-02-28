import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { ApolloServer } from "@apollo/server";

import DateType from "./typeDefs/DateScalarType.js";

import MovieResolvers from "./resolvers/MovieResolvers.js";
import ReviewResolvers from "./resolvers/ReviewResolvers.js";

import ReviewMutations from "./mutations/ReviewMutations.js";

const typeDef = `#graphql

    scalar Date
    
    type Review {
        _id:String,
        user_id:String,
        name:String,
        review:String,
        movie_id:ID,
        stars:Int,
        date:Date,
    }

    type Movie {
        _id:ID!,
        title:String,
        plot:String,
        genres:[String],
        cast:[String],
        poster:String,
        runtime:Float,
        rated:String,
    }
    
    type MovieAndReview {
        _id:ID!,
        title:String,
        plot:String,
        genres:[String],
        cast:[String],
        poster:String,
        runtime:Float,
        rated:String,
        reviews:[Review]
    }

    input ReviewInput {
        user_id:String,
        name:String!,
        review:String!,
        movie_id:ID!,
        date:String,
        stars:Int!
    }


    type Query {
        getMovies(filter:String, page:Int, num:Int):[Movie],
        getMovieById(id:ID!):[MovieAndReview],
        getRatings:[String],
        getGenres:[String],
        getReviews:[Review]
    }

    type Mutation {
        createReview(input:ReviewInput):Review,
        updateReview(review:String!, id:ID!):Review,
        deleteReview(id:ID!):Review
    }
    
    `;
const resolvers = {
    Date:DateType,

    Query: {
        ...MovieResolvers,
        ...ReviewResolvers
    },
    Mutation: {
      ...ReviewMutations,
    }

    
}
const apollo = new ApolloServer({typeDefs:typeDef, resolvers:resolvers});


export default apollo;