import React, { useState } from 'react'
import './style.scss'
import { getBoardData } from '../../../../_actions/boardAction'
import { useDispatch, useSelector } from 'react-redux';
import BoardDisplayTable from '../../components/BoardDisplayTable';
import WrapperLoading from '../../../../components/WrapperLoading';
import ProblemBoardLayout from '../../../../layouts/ProblemBoardLayout';

//게시판 페이지를 그려주는 컴포넌트
function ProblemBoardPage(props) {

    const [[boardposts], setBoard ] = useState([]);

    const [keyword, setKeyword] = useState("");
    const [resultBoard, setResultBoard] = useState([]);

    const [countDisplayPost, setCountDisplayPost] = useState(15);
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(false)

    // 컴포넌트가 렌더링 될 때마다 갱신 데이터를 받아오는 HOOK
    React.useEffect(() => {
        dispatch(getBoardData()).then(response => {
            console.log(response.payload);
            const { data } = response.payload;
            setBoard([data])
            const slicePosts = data.slice(0, Number(countDisplayPost))
            setResultBoard(slicePosts)
        })
    }, [])


    const handleChange = (e) => {
        setLoading(true)
        let searchValue = e.target.value;
        const filterPosts = boardposts.filter(element => element.post_id === Number(searchValue) || element.post_title.match(new RegExp(searchValue, "i")))
        console.log(filterPosts)
        setKeyword(searchValue);    
        setResultBoard(filterPosts)

        setInterval(function(){ 
            setLoading(false)
        }, 500);
        
    }

    const handleChangeDisplayPro = (e) => {
        setLoading(true)
        const countValue = e.target.value;
        setCountDisplayPost(countValue);

        const slicePosts = boardposts.slice(0, Number(countValue))
        setResultBoard(slicePosts);

        setInterval(function(){ 
            setLoading(false)
        }, 500);
    }

    const blockSearch = keyword ? {display: "block"} : {display: "none"};
    const blockFotter = keyword && resultBoard.length === 0 ? {display: "none"} : {display: "block"};

    return (
        <ProblemBoardLayout>
            <div className="problemboard_page">
                <div className="container">
                    <div className="wrapper__search">
                        <div className="wrapper__search-key">
                            <input type="text" value={keyword} className="wrapper__search--text" onChange={handleChange} placeholder="이름, 번호를 입력하여 검색하세요."/>
                            <p style = {blockSearch}>{keyword}
                            &nbsp;<span style={{cursor: "pointer"}} onClick={() => setKeyword("")}>x</span>
                            </p>
                        </div>
                    </div>
                    <div className="wrapper__problems">
                        {
                            loading ? 
                            <WrapperLoading type={'bars'} color={'black'} />
                            :
                                keyword ? 
                                    (resultBoard && resultBoard.length != 0) ?
                                        <BoardDisplayTable boardposts = {resultBoard}/> 
                                    :
                                    <div style={{fontSize: '20px', textAlign: 'center', margin: '50px 0'}}>
                                        <p>검색 결과가 없습니다.</p>
                                    </div>
                                        
                                :
                                (resultBoard && resultBoard.length != 0) ?
                                        <BoardDisplayTable boardposts = {resultBoard} /> 

                                    :
                                    (boardposts&&boardposts.length != 0) ?
                                            <BoardDisplayTable boardposts = {boardposts} />  :
                                        <WrapperLoading type={"bars"} color={"black"} />

                        }
                        <div className="row-selector" style={blockFotter}>
                            <select class="form-control" onChange={handleChangeDisplayPro} value={countDisplayPost}>
                                <option value="15">15</option>
                                <option value="30" selected="">30</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <span className="sort-caret">
                                게시글 수
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </ProblemBoardLayout>
    )
}

export default ProblemBoardPage