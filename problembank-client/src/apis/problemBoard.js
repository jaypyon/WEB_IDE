import axiosClient from './axios'

const problemBoard = {
    getBoardCategory: (params) => {
        const url = '/board/getcategory';
        return axiosClient.get(url, { params });
    },
    getBoardByCategoryID: (params) => {
        const url = '/board/category';
        return axiosClient.get(url, { params });
    },
    getBoardData: (params) => {
        const url = '/board/boarddata';
        return axiosClient.get(url);
    },
    getBoardInformation: (params) => {
        const url = '/board/getboardinfo';
        return axiosClient.get(url);
    },
    pushLike: (params) => {
        // const url = '/problems/problemtomylist';
        // return axiosClient.post(url, params);
    },
    getPostsFromLiked: (params) => {
        // const url = '/problems/getmyproblems';
        // return axiosClient.get(url);
    }
}

export default problemBoard;