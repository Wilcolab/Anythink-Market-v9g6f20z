/**
 * @module routes/api/comments
 * @description Express router for handling comment-related API endpoints.
 */

 /**
    * GET /
    * @summary Retrieve all comments.
    * @route GET /api/comments
    * @returns {Array<Object>} 200 - An array of comment objects
    * @returns {Object} 500 - Error message if fetching comments fails
    */
 
 /**
    * DELETE /:id
    * @summary Delete a comment by its ID.
    * @route DELETE /api/comments/{id}
    * @param {string} id.path.required - The ID of the comment to delete
    * @returns {null} 204 - No content, comment deleted successfully
    * @returns {Object} 404 - Error message if comment not found
    * @returns {Object} 500 - Error message if deletion fails
    */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// add another endpoint for deleting a comment   
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
});