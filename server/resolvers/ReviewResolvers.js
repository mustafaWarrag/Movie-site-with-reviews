import Review from "../models/Review.js";
const ReviewResolvers = {
    async getReviews(parent, args) {
        let page = parseInt(args.page)? parseInt(args.page) : 0;
        let num = parseInt(args.num)? parseInt(args.num) : 5
        let list = await Review.find({})
                                //.limit(num)
                                .skip(page);
        return list;
    },

    
}
export default ReviewResolvers