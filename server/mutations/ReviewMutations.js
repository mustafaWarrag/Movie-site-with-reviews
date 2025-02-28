import cuid2 from "@paralleldrive/cuid2";
import { ObjectId } from "mongodb";

import Review from "../models/Review.js";
const ReviewMutations = {
    async createReview(parent, {input}) {
        try {
            const {name, review, movie_id, stars} = input;
            let objMovieId = movie_id instanceof ObjectId? movie_id : ObjectId.createFromHexString(movie_id); //does not work for some reason
            let reviewField = {
                user_id:cuid2.createId(),
                name:name,
                review:review,
                movie_id:objMovieId,
                date:Date.now(),
                stars:stars
            }
            
            let doc = new Review(reviewField);
            if (!doc) {
                throw new Error("invalid input")
            }
            await doc.save();
            return doc;
            //return {status:200, message:"successfully created a review!"}
        } catch(err) {
            console.error("cant create review: " + err);
            let data = {status:500, message:"failed to create review"}
            return data;
        }
    },
    
    async updateReview(_, args) {
        try {
            let review = args.review;
            let reviewId = args.id;
            //if (await Review.find({_id:}))
            if (!(args.id) || !(args.review)) {
                throw new Error("Provide values for the field");
            }
            let updateDoc = await Review.updateOne({_id:ObjectId.createFromHexString(reviewId)},{review:review});
            if (!updateDoc) {
                throw new Error("Invalid Id, may not exist");
            }
            return {status:"successful review update"}
        } catch(err) {
            console.error("Error: cant update review " + err)
        }
    },

    async deleteReview(_, args) {
        try {
            let reviewId = args.id;
            let deleteDoc = await Review.deleteOne({_id:ObjectId.createFromHexString(reviewId)});
            if (!deleteDoc) {
                throw new Error("Invalid Id, may not exist");
            }
            return {status:"deleted review successfully"}
        } catch(err) {
            console.error("Error: Cannot Delete Review " + err)
        }
    }
}
export default ReviewMutations