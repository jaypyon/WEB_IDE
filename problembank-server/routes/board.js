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
router.post('/writepost', async function(req, res){
    const { sourceCode, problemId, language } = req.body;
    const [testCases] = await db.query(sql.problems.selectTestCaseByProblemId, [problemId]);
    let correctCount = 0;
    try {
        const promises = testCases.map(testcase => {
            return new Promise((resolve) => {
                const docker = compiler.getProblemDocker(sourceCode, language);

                let isStarted = false;
                docker.stderr.on("data", (data) => {
                    console.log(data.toString('utf-8'));
                })
    
                docker.stdout.on("data", (data) => {
                    if(!isStarted) return;
                    const line = data.toString('utf-8');
                    if(line.includes(testcase.output)) correctCount++;
                })
    
                docker.stdout.on("data", (data) => {
                    const line = data.toString('utf-8');
                    if(line.includes(startDelem)) {
                        isStarted = true;
                        docker.stdin.write(Buffer.from(testcase.input + "\n"));
                    } else if(line.includes(endDelem)) {
                        isStarted = false;
                        resolve();
                    }
                });
            });
        })
        
        res.status(200).send({
            result: true,
            data:  { correctCount, count: testCases.length },
            message: 'compile success'
        })
    
        for(let i = 0 ; i < promises.length; i++) { await promises[i] } // TODO: recfectoring this
    } catch (error) {
        console.log(error)
        res.status(404).send({
            result: false,
            data: [],
            message: error
        })
    }

    // socket.emit("result", { correctCount, count: testCases.length })
    // socket.leave();
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

router.post('/writepost', async function(req, res){
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