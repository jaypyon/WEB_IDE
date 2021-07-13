import axiosClient from './axios'

const problemBoard = {

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