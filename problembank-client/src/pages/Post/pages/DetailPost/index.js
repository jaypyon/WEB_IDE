import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string'
import { getBoardData } from '../../../../_actions/boardAction';
import WrapperLoading from '../../../../components/WrapperLoading';
import Loading from '../../../../components/Loading/Loading';
import DetailPostLayout from '../../../../layouts/DetailPostLayout';
import projectsAPI from '../../../../apis/projects';
var moment = require('moment');

function DetailPost(props) {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState({})
    const postsAllData = useSelector(state => state.post);
    const [submit, setSubmit] = useState(false)

    const [comment_value, setCommentValue] = useState({})
    
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(true)
    
    const { id } = queryString.parse(props.location.search);

    useEffect(() => {
        if(postsAllData){
            const { data }  = postsAllData;
            const [ post ] = data.filter(element =>Number(element.post_id) === Number(id))
            setPosts(data)
            setLoading(false)
            setPost(post)
        }else{
            dispatch(getBoardData()).then(response => {
                const { data } = response.payload
                const [ post ] = data.filter(element =>Number(element.post_id) === Number(id))
                
                console.log(post)
                setPost(post)
                setPosts(data)
                setLoading(false)
            })
        }
    }, [id])

    const handleEditorChange = (env, value) => {
        //setContentEditor(value)
    }
    
    //submit content editor & problem
    const onSubmit = async () => {
        try {
            setSubmit(true)
            const postId = queryString.parse(window.location.search).id;
             
            const res = await projectsAPI.writeComment({
                post_id: Number(postId),
                comment_content: document.getElementById("comment-text-data").value
            });
            var timeOutSubmit = function(){
                 setSubmit(false);
            };
            setTimeout(timeOutSubmit, 1000);
        } catch (error) {
            setSubmit(false);
            alert("서버오류입니다. 잠시 후 다시 시도해주세요." + error);
        }
    }
    const onDelete = async (param) => {
        try {
            setSubmit(true)
            const postId = queryString.parse(window.location.search).id;
             
            const res = await projectsAPI.deleteComment({
                comment_id: Number(param),
            });
            var timeOutSubmit = function(){
                 setSubmit(false);
            };
            setTimeout(timeOutSubmit, 1000);
        } catch (error) {
            setSubmit(false);
            alert("서버오류입니다. 잠시 후 다시 시도해주세요." + error);
        }
    }
    const onDeletePost = async (param) => {
        try {
            setSubmit(true)
            const res = await projectsAPI.deletePost({
                post_id: Number(param),
            });
            var timeOutSubmit = function(){
                 setSubmit(false);
            };
            setTimeout(timeOutSubmit, 1000);
        } catch (error) {
            setSubmit(false);
            alert("서버오류입니다. 잠시 후 다시 시도해주세요." + error);
        }
    }
    const handleCopyURL = () => {
        var dummy = document.createElement('input'),
        text = window.location.href;

        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert("링크가 복사 되었습니다")
    }

    if(loading){
        return <Loading  type={'bars'} color={'black'}  />
    }
    return (
        post?
        <DetailPostLayout>
            <div className="problem__detail">
                <div className="problem__detail--content">
                    <div className="tab__header">
                        <ul className="tab__header--content">
                            <li onClick={() => props.history.push(`/problem/view?id=${post.problem_num}`)}>문제 보기</li>
                        </ul>
                    </div>
                    <div className="wrapper__content">
                        <h3>{post.post_title}</h3>
                        <ul className="tab__header--task">
                            <li style={{cursor: 'pointer'}} onClick={() => handleCopyURL()}><i className="fa fa-share-square-o"></i> Share</li>
                            <li>Created: {moment(post.written_date).format("YYYY-MM-DD")}</li>
                            <li Style="color: #546E74;font-size: 13px;text-align: -webkit-right;" style={{cursor: 'pointer'}} onClick={() => {
                                                    onDeletePost(post.post_id).then((res)=>{
                                                        alert("게시물이 삭제되었습니다.")
                                                        props.history.push(`/problemboard`)
                                                    })}}>delete</li>

                        </ul>
                        <div className="problem__infor">
                            <div className="problem__infor--desc">
                                <p>내용</p>
                                <span>{post.post_content}</span>
                            </div>
                            <div className="problem__infor--sourcecode">
                                <p>소스 코드</p>
                                <span className="sourcecode">{post.post_sourcecode}</span>
                            </div>
                        </div>
                    </div>
                    <div className="tab__footer">
                        <div className="review__listproblem">
                            <span onClick={() => props.history.push('/problemboard')}><i className="fa fa-list"></i>&nbsp;문제 토론방</span>
                        </div>
                        <div className="pre-next-problem">
                            {
                                posts.length !== 0 ?
                                    <>
                                    <button onClick={() => props.history.push(`/board/view?id=${post.post_id - 1}`)} disabled={post.post_id === posts[0].post_id} >Prev</button>&nbsp;
                                    <button onClick={() => props.history.push(`/board/view?id=${post.post_id + 1}`)} disabled={post.post_id === posts[posts.length-1].post_id}>Next</button>
                                    </>
                                : ""
                                
                            }
                        </div>
                    </div>
                </div>
                
                <div className="problem__detail--commentarea">
                               { submit ? <div className="wrapper__editor--submit">
                                    <WrapperLoading />
                                </div> : ""}
                    <br/>
                    <div Style="overflow-y: scroll; height:600px;">
                                    {
                                        post.comments_info.length !== 0 &&
                                        post.comments_info.map(comment_ => 
                                            <form className="comment-form" >
                                                <div className="comment-form-fields">
                                                <i Style="font-size:28px;" className="fa fa-smile-o "> </i>&nbsp;<li Style="color: #546E74;font-size: 13px;text-align: -webkit-right;" style={{cursor: 'pointer'}} onClick={() => {
                                                    onDelete(comment_.comment_id).then((res)=>{
                                                        alert("댓글이 삭제되었습니다.")
                                                        window.location.reload()
                                                    })
                                                    
                                                }}> delete</li>
                                                <p Style="border-bottom: 1px solid #838383;">{" "+comment_.comment_content}</p>
                                                </div>  
                                                <li Style="color: #546E74;font-size: 13px;text-align: -webkit-right;">Created: {moment(comment_.created_at).format("YYYY-MM-DD HH:mm:ss")}</li>
                                                
                                                
                                            </form>
                                        )
                                    }
                    </div>
                    <br/>            
                            <form className="comment-form" >
                                <i className="fa fa-list"></i>
                                <div className="comment-form-fields">
                                <textarea id="comment-text-data" placeholder=" 의견을 남겨주세요 !" ></textarea>
                                </div>
                                
                            </form>
                            <div className="tab__footer">
                            <button onClick={() => 
                                    {
                                       onSubmit().then((res)=>{
                                           alert("댓글이 게시되었습니다.")
                                           window.location.reload()
                                        });
                                    }} >댓글 작성</button>    
                            </div>
                            
                    </div>
                <div className="wrapper__editor">
                    
                </div>
            </div>
        </DetailPostLayout>:""
    )
};

export default DetailPost;

