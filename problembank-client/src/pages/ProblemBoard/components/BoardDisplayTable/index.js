import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import './style.scss'
var moment = require('moment');

function BoardDisplayTable(props) {
    const { boardposts } = props;
    console.log(boardposts);
    return (
        <table className="table table-contribution">
            <thead>
                <tr>
                    <th width = "5%">순번</th>
                    <th width = "15%">문제번호</th>
                    <th width = "40%">제목</th>
                    <th width = "5%">댓글</th>
                    <th width = "15%">작성일</th>
                </tr>
            </thead>
            <tbody>
                {
                    boardposts.map((item) => {
                        return (
                            <tr onClick={() => props.history.push(`/board/view?id=${item.post_id}`)}>
                                <th>{item.post_id}</th>
                                <th>{item.problem_num}</th>
                                <td>{item.post_title}</td>
                                <th>{item.comment_num}</th>
                                <th>{moment(item.written_date).format("YYYY-MM-DD")}</th>
                                
                            </tr>
                        )
                    })
                }
            </tbody>     
        </table>
    )
}
export default withRouter(BoardDisplayTable)

