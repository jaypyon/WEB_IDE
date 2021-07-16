import axiosClient from './axios'

const problemBoard = {
//질문 게시판의 게시물 데이터를 서버에 요청하는 함수.
    getBoardData: (params) => {
        const url = '/board/boardposts';
        return axiosClient.get(url);
    },    
    getBoardCommentData: (params) => {
        const url = '/board/boardcomment';
        return axiosClient.get(url);
    }
}

export default problemBoard;