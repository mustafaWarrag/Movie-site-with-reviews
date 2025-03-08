import { GraphQLError } from "graphql"

import Review from "../models/Review.js";

const ReviewResolvers = {
    async getReviews(parent, args) {
        try {
            let page = parseInt(args.page)? parseInt(args.page) : 0;
            let num = parseInt(args.num)? parseInt(args.num) : 5
            let list = await Review.find({})
                                    .limit(num)
                                    .skip(page);
            return list;
        } catch(err) {
            console.error("Unable to find all reviews");
            return {error:err};
        }
    },
    async getReviewsByUser(_, args) {
        try {    
            let page = parseInt(args.page)? parseInt(args.page) : 0;
            let num = parseInt(args.num)? parseInt(args.num) : 5
            let {username} = args;
            let userReviews = await Review.find({username:username})
                                            .limit(num)
                                            .skip(page);
            return userReviews;
        } catch(err) {
            console.error("Unable to find user reviews: " + err);
            return {error:err};
        }
    }
}
export default ReviewResolvers