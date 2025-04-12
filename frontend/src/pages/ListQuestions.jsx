import { getQuestions } from "../api"
import { useState, useEffect } from "react"
import { Question } from "../components/Question"
import classNames from 'classnames';

export function ListQuestions() {

    const [questions, setQuestions] = useState([])
    const [doClass, setClass ] = useState('ps-3 border-start border-3 border-primary rounded')
    
    useEffect(() => {
        async function loadAllQuestions() {
            const data = await getQuestions()
            //data.sort((d1, d2) => new Date(d2.dateCreated).getTime() - new Date(d1.dateCreated).getTime())
            setQuestions(data)
            //console.log(data)
            
        }
        loadAllQuestions()
    }, [])

      

    return (
        <div>
            <h1>QUESTIONS</h1>
            <hr className="border-dashed my-3"></hr>
            {questions.map((question) => {
                return (

                    <div className="hstack gap-3 justify-content-between questionlist border-bottom" key={question.qid}>
                        <div className="hstack gap-3">
                            <div className="wd-7 ht-7 bg-secondary rounded-circle"></div>
                            <div className={classNames({
                                'ps-3 border-start border-3 border-primary rounded': question.category === 'identify', // Apply 'my-style' if item.value is 'something'
                                'ps-3 border-start border-3 border-danger rounded': question.category === 'resolve', // Apply 'another-style' if item.value is 'else'
                                'ps-3 border-start border-3 border-success rounded': question.category === 'recover', // Apply 'another-style' if item.value is 'else'
                                'ps-3 border-start border-3 border-warning rounded': question.category === 'react', // Apply 'another-style' if item.value is 'else'
                            })} >
                                <span className="fw-semibold mb-1 ">{question.question}</span>
                                <span className="fs-12 text-muted">
                                    <i className="feather-message-square fs-10 me-1"></i>
                                    <span className="fw-normal">(qid: {question.qid}) (categoryid: {question.categoryId})</span>
                                </span>

                            </div>
                        </div>
                        <div className="hstack gap-2">
                            <span>{question.category}</span>
                        </div>

                        
                    </div>



                )
            })}

        </div>

    )
    
}