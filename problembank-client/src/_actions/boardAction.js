import problemAPI from '../apis/problemBoard'
import {
    GET_BOARD_DATA,
    GET_BOARD_INFO
}from './types.js'

export async function getBoardData(){
    const request = problemAPI.getBoardData()
    return {
        type: GET_BOARD_DATA,
        payload: request
    }
}
export async function getBoardInformation(){
    const request = problemAPI.getBoardInformation();
    return {
        type: GET_BOARD_INFO,
        payload: request
    }
}