import axiosClient from "./axios";

const projectAPI = {
    //게시물 및 댓글의 CRUD를 요청
    writeComment:(params)=>{
        const url = '/board/writecomment';
        return axiosClient.post(url, params );
    },
    deleteComment:(params)=>{
        const url = '/board/deletecomment';
        return axiosClient.post(url, params );
    },
    writePost:(params)=>{
        const url = '/board/writepost';
        return axiosClient.post(url, params );
    },
    deletePost:(params)=>{
        const url = '/board/deletepost';
        return axiosClient.post(url, params );
    },

    //기존 레거시 코드에서 컴파일 및 미구현 기능인 즐겨찾기 요청
    compile: (params) => {
        const url = '/projects/compile';
        return axiosClient.post(url, params );
    },
    addMyList: (params) => {
        const url = '/projects/addlist';
        return axiosClient.post(url, params)
    }
}

export default projectAPI;