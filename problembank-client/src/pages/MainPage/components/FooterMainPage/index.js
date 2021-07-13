import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getProblemsInformation } from '../../../../_actions/problemAction';
import { getBoardData } from '../../../../_actions/boardAction';
import './style.scss'

export default function FooterMainPage() {

    const [value, setValue] = useState({})
    const [board, setBoard] = useState({})
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProblemsInformation()).then(response => {
            const { data } = response.payload
            setValue(data)
        })
        dispatch(getBoardData()).then(response=>{
            const { data } = response.payload
            setBoard(data)
        })
    }, [])

    return (
        <div className="footer__mainpage">
            <div className="wrapper">
                <div className="col">
                    <h2>{value.pbl_count}</h2>
                    <h4>전체 문제</h4>
                </div>
                <div className="col">
                    <h2>{value.pbl_scoring}</h2>
                    <h4>재첨 가능한 문제</h4>
                </div>
                <div className="col">
                    <h2>{value.pbl_dont}</h2>
                    <h4>풀린 문제</h4>
                </div>
                <div className="col">
                    <h2>{value.language_scroring}</h2>
                    <h4>채점 가능한 언어</h4>
                </div>
                <div className="col">
                    <h2>{board.length}</h2>
                    <h4>등록된 질문</h4>
                </div>
            </div>
        </div>
    )
}