import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { ApolloServer } from "@apollo/server";

import DateType from "./typeDefs/DateScalarType.js";

import MovieResolvers from "./resolvers/MovieResolvers.js";
import ReviewResolvers from "./resolvers/ReviewResolvers.js";
import UserResolvers from "./resolvers/UserResolvers.js";

import ReviewMutations from "./mutations/ReviewMutations.js";
import UserMutations from "./mutations/UserMutations.js";


const typeDef = `#graphql

    scalar Date
    
    type Review {
        _id:String,
        user_id:String,
        username:String,
        review:String,
        movie_id:ID,
        stars:Int,
        date:Date,
        error:String
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
        error:String
    }
    type SearchResults {
        movies:[Movie],
        totalNumOfMovies:Int,
        error:String
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

    type User {
        _id:ID,
        username:String,
        password:String,
        error:String
    }

    type Authpayload {
        id:String,
        username:String,
        token:String,
        error:String
    }

    type Token {
        user_id:String,
        username:String,
        error:String
    }

    input ReviewInput {
        username:String!,
        review:String!,
        movie_id:ID!,
        date:String,
        stars:Int!,
        error:String
    }

    input UserInput {
        username:String!,
        password:String!,
        error:String
    }
    

    type Query {
        getMovies(filter:String, page:Int, num:Int):[Movie],
        getMovieById(id:ID!):[MovieAndReview],
        searchForMovieByFilter(title:String, rated:String, page:Int, num:Int):SearchResults,
        getRatings:[String],
        getGenres:[String],

        getReviews:[Review],
        getReviewsByUser(username:String, page:Int, num:Int):[Review],

        getUsers(page:Int, num:Int):[User],
        tokenVerify(token:String):Token
    }

    type Mutation {
        createReview(input:ReviewInput):Review,
        updateReview(review:String!, id:ID!):Review,
        deleteReview(id:ID!):Review,
        
        handleLogin(username:String!, password:String!):Authpayload
        createUser(userdata:UserInput!):User,
        deleteUser(id:ID!):User
    }
    
    `;
const resolvers = {
    Date:DateType,

    Query: {
        ...MovieResolvers,
        ...ReviewResolvers,
        ...UserResolvers
    },
    Mutation: {
      ...ReviewMutations,
      ...UserMutations
    }

    
}
const apollo = new ApolloServer({ typeDefs:typeDef, resolvers:resolvers});


export default apollo;