const Comment = require('../models/comment');
const GlobalResponse = require("./../response/globalResponse");
const STATUS = require("./../utils/statusCode");
const GlobalErrorHander = require("./../utils/globalErrorHandle");

module.exports = {
    createComment: async (comment) => {
        try {
            const newComment = new Comment(comment);
            await newComment.save();
            return GlobalResponse(STATUS.SUCCESS.CREATED, "Comment store successfully", newComment);
        } catch (err) {
            return GlobalErrorHander(err);
        }
    },

    filterAndSortComments: async ({query = {}, sort = {}}) => {
        try {
            const comments = await Comment.find(query).sort(sort).populate('commenter');
            return GlobalResponse(STATUS.SUCCESS.OK, "Comments retried successfully", comments);
        } catch (err) {
            return GlobalResponse(err);
        }
    },
};
