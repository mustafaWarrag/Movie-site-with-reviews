import cuid2 from "@paralleldrive/cuid2";
import { ObjectId } from "mongodb";
import {GraphQLError} from "graphql";

import Review from "../models/Review.js";
import User from "../models/User.js";

const ReviewMutations = {
    async createReview(parent, {input}) {
        try {
            const {username, review, movie_id, stars} = input;
            let userExists = await User.findOne({username:username});
            if (!userExists) {
                throw new GraphQLError("User does not exist");
            }
            let user_id = await userExists.get("_id");
            let reviewExists = await Review.findOne({user_id:user_id, movie_id:movie_id});
            if (reviewExists) {
                throw new GraphQLError("You already posted a review on this movie");
            }
            let objMovieId = movie_id instanceof ObjectId? movie_id : ObjectId.createFromHexString(movie_id); //does not work for some reason
            let reviewField = {
                user_id:user_id,
                username:username,
                review:review,
                movie_id:objMovieId,
                date:Date.now(),
                stars:stars
            }
            
            let doc = new Review(reviewField);
            if (!doc) {
                throw new GraphQLError("invalid input")
            }
            await doc.save();
            return doc;
            //return {status:200, message:"successfully created a review!"}
        } catch(err) {
            console.error("cant create review: " + err);
            return {error:err};
        }
    },
    
    async updateReview(_, args) {
        try {
            let review = args.review;
            let reviewId = args.id;
            //if (await Review.find({_id:}))
            if (!reviewId || !review) {
                throw new GraphQLError("Provide values for the field");
            }
            let reviewExists = await Review.findOne({_id:ObjectId.createFromHexString(reviewId)});
            if (!reviewExists) {
                throw new GraphQLError("Review may not exist");
            }
            let updateDoc = await Review.updateOne({_id:ObjectId.createFromHexString(reviewId)},{review:review});
            if (!updateDoc) {
                throw new GraphQLError("Invalid Id, may not exist");
            }
            return updateDoc
        } catch(err) {
            console.error("Error: cant update review " + err);
            return {error:err}
        }
    },

    async deleteReview(_, args) {
        try {
            let reviewId = args.id;
            let reviewExists = await Review.findOne({_id:ObjectId.createFromHexString(reviewId)});
            if (!reviewExists) {
                throw new GraphQLError("Invalid Id, may not exist");
            }
            let deleteDoc = await Review.deleteOne({_id:ObjectId.createFromHexString(reviewId)});
            if (!deleteDoc) {
                throw new GraphQLError("Something gone wrong");
            }
            return deleteDoc
        } catch(err) {
            console.error("Cannot Delete Review: " + err);
            return {error:err}
        }
    }
}
export default ReviewMutations