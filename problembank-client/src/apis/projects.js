import axiosClient from "./axios";

const projectAPI = {
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