module.exports = {

    // SELECT 
    getAllPosts : "select * from plass_problemboard",
    getAllComments : "select * from plass_boardcomment",
    getTargetCommentsNum : "select count(*) as comment_num from plass_boardcomment where post_id=?",
    getTargetComments : "select * from plass_boardcomment where post_id=?",
    
    // INSERT
    createNewPost : "insert into plass_problemboard(problem_num,post_title,post_content,post_sourcecode) values(?,?,?,?)",
    createNewComment : "insert into plass_boardcomment(post_id,comment_content) values(?, ?)",
    // DELETE 
    deletePost : "DELETE FROM plass_problemboard WHERE post_id=?",
    deleteComment : "DELETE FROM plass_boardcomment WHERE comment_id=?"
}
