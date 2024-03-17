const Like = require('../models/like');
const STATUS = require("./../utils/statusCode");
const Comment = require("./../models/comment");
const GlobalResponse = require("./../response/globalResponse");

module.exports = {
    likeComment: async (profileLikeId, commentId) => {
        try {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                return {code: STATUS.CLIENT_ERRORS.BAD_REQUEST, message: "Comments id not found"};
            }
            const existingLike = await Like.findOne({profileLikeId, commentId});

            if (existingLike) {

                await Like.findOneAndDelete({profileLikeId, commentId});
                await comment.decrementLikes(); // Increment likes

                const currentLikes = await comment.getCurrentLike()
                return GlobalResponse(
                    STATUS.SUCCESS.OK,
                    "unlike successfully",
                    {currentLikes: currentLikes}
                );

            }

            const newLike = new Like({profileLikeId, commentId});
            await newLike.save();

            await comment.incrementLikes(); // Increment likes
            const currentLikes = await comment.getCurrentLike()
            return GlobalResponse(STATUS.SUCCESS.OK, "Like Successfully", { currentLikes: currentLikes});
        } catch (err) {
            return GlobalResponse(err);
        }
    }
};
