import problemAPI from '../apis/problemBoard'
import {
    GET_BOARD_DATA,
    GET_BOARD_INFO
}from './types.js'
//질문 게시판의 게시물 데이터를 서버에 요청하는 함수.
export async function getBoardData(){
    const request = problemAPI.getBoardData()
    return {
        type: GET_BOARD_DATA,
        payload: request
    }
}
//질문 게시판의 코멘트 정보를 서버에 요청하는 함수.
export async function getBoardCommentData(){
    const request = problemAPI.getBoardCommentData();
    return {
        type: GET_BOARD_COM,
        payload: request
    }
}