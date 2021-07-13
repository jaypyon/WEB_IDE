import React, { useEffect, useRef, useState } from 'react'
import './stylePost.scss'
import { ControlledEditor } from "@monaco-editor/react";
import SampleCode from '../../../../constansts/SampleCode';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string'
import { getProblemData } from '../../../../_actions/problemAction';
import projectsAPI from '../../../../apis/projects';
import problemsBank from '../../../../apis/problemsBank';
import WrapperLoading from '../../../../components/WrapperLoading';
import Loading from '../../../../components/Loading/Loading';
import DetailProblemLayout from '../../../../layouts/DetailProblemLayout';
var moment = require('moment');

function PostUpload(props) {
    const [problems, setProblems] = useState([])
    const [problem, setProblem] = useState({})
    const {problemsAllData} = useSelector(state => state.problem);

    const [language, setLanguage] = useState("c")
    const [contentEditor, setContentEditor] = useState(SampleCode["c"])
    const [submit, setSubmit] = useState(false)
    const [theme, setTheme] = useState("white")
    
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(true)
    
    const { id } = queryString.parse(props.location.search);

    useEffect(() => {
        if(problemsAllData){
            const { data }  = problemsAllData;
            const [ problem ] = data.filter(element =>Number(element.id) === Number(id))
            setProblems(data)
            setLoading(false)
            setProblem(problem)
        }else{
            dispatch(getProblemData()).then(response => {
                const { data } = response.payload
                const [ problem ] = data.filter(element =>Number(element.id) === Number(id))
                
                console.log(problem)
                setProblem(problem)
                setProblems(data)
                setLoading(false)
            })
        }
    }, [id])

    const handleEditorChange = (env, value) => {
        setContentEditor(value)
    }
    
    //submit content editor & problem
    const onSubmit = async () => {
        try {
            setSubmit(true)
            const problemId = queryString.parse(window.location.search).id;
             
            const res = await projectsAPI.writePost({
                problem_num: Number(problemId),
                post_title: document.getElementById("post-text-data--title").value,
                post_content: document.getElementById("post-text-data--content").value,
                post_sourcecode: document.getElementById("post-text-data--sourcecode").value
            });
            var timeOutSubmit = function(){
                 setSubmit(false);
            };console.log(res);
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
    const handleProblemToList = async (id) => {
        try {
            const params = {
                problemId : id
            }
            const response = await problemsBank.ProblemToMyList(params);
            let problemTemp = {...problem, like : !problem.like};
            setProblem(problemTemp)
        } catch (error) {
            alert("서버 연결 실패했습니다. 다시 시도해주세요.")
            console.log(error);
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
        <DetailProblemLayout>
            <div className="problem__detail">
                <div className="problem__detail--content">
                    <div className="tab__header">
                        <ul className="tab__header--content">
                            <li style={{background: 'white'}} onClick={() => alert("현재 개발중인 기능 입니다...")}>해설</li>
                            {/* <li onClick={() => alert("현재 개발중인 기능 입니다...")}>답안</li>
                            <span>|</span> */}
                            <li onClick={() => props.history.push(`/postupload/view?id=${problem.id}`)}>질문등록</li>
                            {/* <span>|</span>
                            <li onClick={() => alert("현재 개발중인 기능 입니다...")}>Submit</li> */}
                        </ul>
                    </div>
                    <div className="wrapper__content">
                        <h3>{problem.id}. {problem.name}</h3>
                        <ul className="tab__header--task">
                            <li style={{cursor: 'pointer'}} onClick={() => handleProblemToList(problem.id)}><i className="fa fa-list-alt"></i> { problem.like ? "Remove list" : "Add to list"}</li> 
                            <li style={{cursor: 'pointer'}} onClick={() => handleCopyURL()}><i className="fa fa-share-square-o"></i> Share</li>
                            <li>Created: {moment(problem.created).format("YYYY-MM-DD")}</li>
                            <li>Language: {problem.language}</li>
                        </ul>
                        <div className="problem__infor">
                            <div className="problem__infor--desc">
                                <p>문재 정의</p>
                                <span>{problem.content}</span>
                            </div>
                            <div className="problem__infor--input">
                                <p>입력</p>
                                <span>{problem.input}</span>
                            </div>
                            <div className="problem__infor--output">
                                <p>츨력</p>
                                <span>{problem.output}</span>
                            </div>
                            <div className="problem__infor--example">
                                <div className="problem__infor--inputexp">
                                    <p>입력 예제</p>
                                    {
                                        problem.testcases.length !== 0 &&
                                            problem.testcases.map(testcase => <span>{testcase.input_exp}</span>)
                                    }
                                </div>
                                <div className="problem__infor--outputexp">
                                    <p>출력 예제</p>
                                    {
                                        problem.testcases.length !== 0 &&
                                            problem.testcases.map(testcase => <span>{testcase.output_exp}</span>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab__footer">
                        <div className="review__listproblem">
                            <span onClick={() => props.history.push('/totalproblems')}><i className="fa fa-list"></i>&nbsp;Problem</span>
                        </div>
                        <div className="pre-next-problem">
                            {
                                problems.length !== 0 ?
                                    <>
                                    <button onClick={() => props.history.push(`/problem/view?id=${problem.id - 1}`)} disabled={problem.id === problems[0].id} >Prev</button>&nbsp;
                                        <span>{problem.id}/{problems.length}</span>&nbsp;
                                    <button onClick={() => props.history.push(`/problem/view?id=${problem.id + 1}`)} disabled={problem.id === problems[problems.length-1].id}>Next</button>
                                    </>
                                : ""
                                
                            }
                        </div>
                    </div>
                </div>
                <div className="problem__detail--content">
                               { submit ? <div className="wrapper__editor--submit">
                                    <WrapperLoading />
                                </div> : ""}
                    <br/>

                    <br/>            
                            <form className="post-form" >
                                <i className="fa fa-list"></i>
                                <div className="post-form-fields">
                                <textarea id="post-text-data--title" placeholder=" 제목" ></textarea><br/><br/>
                                <textarea id="post-text-data--content" placeholder=" 내용" ></textarea><br/><br/>
                                <textarea id="post-text-data--sourcecode" placeholder=" 소스코드" ></textarea><br/>
                                </div>
                                
                            </form>
                            <div className="tab__footer">
                            <button onClick={() => 
                                    {
                                       onSubmit().then((res)=>{
                                           alert("질문이 게시되었습니다.")
                                           window.location.reload()
                                        });
                                    }} >질문 작성</button>    
                            </div>
                            
                    </div>
                
            </div>
        </DetailProblemLayout>
    )
}


export default PostUpload;

