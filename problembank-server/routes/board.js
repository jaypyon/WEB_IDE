var express = require('express');
var router = express.Router();
var db = require('../modules/db-connection');
var sql = require('../sql');
var checkLoginMiddleWare = require('../modules/check-login-middleware');
var randomstring = require("randomstring");
var fileController = require('../modules/file-controller');
var path = require('path');

// Check user for api
// router.use(checkLoginMiddleWare.injectUerforAPI)


//전체문제 출력함
router.get('/boarddata', async function(req, res) {
    try {
        let [rows] = await db.query(sql.board.selectProblems)
        //!수정 필요함
        for(let j = 0; j < rows.length; j++)
        {
            var { id } = rows[j];
            //해당하는 문제의 테스트 케이스를 출력함
            let [testcases] = await db.query(sql.board.selectTestCaseFromProblemId,[id])
            let filterTestCase = testcases.map(testcase => ({
                input_exp: testcase.input_example, 
                output_exp: testcase.output_example
                }
            ))
            rows[j]["testcases"] = filterTestCase;

            //해당하는 문제는 Category를 출력
            let [row] = await db.query(sql.board.selectCategoryFromProblemId,[id]);
            let { parent_id } = row[0];
            let [tagRow] = await db.query(sql.board.getNameTag, [parent_id]);
            row[0]["parent_name"] = tagRow[0].name;
            rows[j]["tagInfo"] = row[0];

        }
        res.status(200).send({
            result : true,
            data: rows,
            message : '전체 문제 리스트'
        })
        
    } catch (error) {
        console.log("Problems Data" + error)
    }
    
})
module.exports = router;