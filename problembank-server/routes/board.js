var express = require('express');
var router = express.Router();
var db = require('../modules/db-connection');
var sql = require('../sql');
var checkLoginMiddleWare = require('../modules/check-login-middleware');
var randomstring = require("randomstring");
var fileController = require('../modules/file-controller');
var path = require('path');

//전체문제 출력함
/**@param temp {댓글 갯수 추출}}*/
router.get('/boardposts', async function(req, res) {
    try {
        let [rows] = await db.query(sql.board.getAllPosts)
        //!수정 필요함

        for(let j = 0; j < rows.length; j++)
        {   
             [comment_num] = await db.query(sql.board.getTargetCommentsNum,rows[j]["post_id"]);
             [comments] = await db.query(sql.board.getTargetComments,rows[j]["post_id"]);
             console.log(comments);
             rows[j]["comment_num"] = comment_num[0]["comment_num"];
             rows[j]["comments_info"] = comments;
        }

        res.status(200).send({
            result : true,
            data: rows,
            message : '전체 게시물 리스트'
        })
        
    } catch (error) {
        console.log("Problems Data" + error)
    }
    
})
router.get('/boardcomments', async function(req, res) {
    try {
        let [rows] = await db.query(sql.board.getAllComments)
        //!수정 필요함
        for(let j = 0; j < rows.length; j++)
        {
         console.log(rows)  
        }
        res.status(200).send({
            result : true,
            data: rows,
            message : '전체 코멘트 리스트'
        })
        
    } catch (error) {
        console.log("Problems Data" + error)
    }
    
})

router.post('/writecomment', async function(req, res){
    try {
        const { post_id,comment_content } = req.body;
        console.log(req.body)
        const testCases = await db.query(sql.board.createNewComment, [post_id,comment_content]);
        res.status(200).send({
            result: true,
            data:  { count: testCases.length },
            message: 'post success'
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            result: false,
            data: [],
            message: error
        })
    }
})  
router.post('/deletecomment', async function(req, res){
    try {
        const { comment_id } = req.body;
        console.log(req.body)
        const testCases = await db.query(sql.board.deleteComment, [comment_id]);
        res.status(200).send({
            result: true,
            data:  { count: testCases.length },
            message: 'post success'
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            result: false,
            data: [],
            message: error
        })
    }
})  
// router.get('/writepost', async function(req, res){
//     try {
//         const testCases = await db.query(sql.board.createNewPost, [5,"post_title","post_content","post_sourcecode"]);
//         res.status(200).send({
//             result: true,
//             data:  { count: testCases.length },
//             message: 'post success'
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(404).send({
//             result: false,
//             data: [],
//             message: error
//         })
//     }
// })  
router.post('/writepost', async function(req, res){
    try {
        const { problem_num,post_title,post_content,post_sourcecode } = req.body;
        console.log("sapdmsapodposa : "+req.body)
        const testCases = await db.query(sql.board.createNewPost, [problem_num,post_title,post_content,post_sourcecode]);
        res.status(200).send({
            result: true,
            data:  { problem_num,post_title,post_content,post_sourcecode },
            message: 'post success'
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            result: false,
            data: [],
            message: error
        })
    }
})  
router.post('/deletepost', async function(req, res){
    try {
        const { comment_id } = req.body;
        console.log(req.body)
        const testCases = await db.query(sql.board.deleteComment, [comment_id]);
        res.status(200).send({
            result: true,
            data:  { count: testCases.length },
            message: 'post success'
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            result: false,
            data: [],
            message: error
        })
    }
})  
module.exports = router;