import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import './style.scss'
var moment = require('moment');

function BoardDisplayTable(props) {
    const { problems } = props;
    return (
        <table className="table table-contribution">
            <thead>
                <tr>
                    <th width = "40%">제목</th>
                    <th width = "10%">카테고리</th>
                    <th width = "10%">댓글</th>
                    <th width = "10%">추천수</th>
                    <th width = "10%">작성일</th>
                </tr>
            </thead>
            <tbody>
                {
                    problems.map((item,index) => {
                        return (
                            <tr key = {index} onClick={() => props.history.push('/board/view?id=1')}>
                                <th>{item.name}</th>
                                <td>{item.tagInfo.parent_name} - {item.tagInfo.name}</td>
                                <th>{item.commentnum}</th>
                                <th>{item.likednum}</th>
                                <th>{moment(item.created).format("YYYY-MM-DD")}</th>
                                
                            </tr>
                        )
                    })
                }
            </tbody>     
        </table>
    )
}
export default withRouter(BoardDisplayTable)

