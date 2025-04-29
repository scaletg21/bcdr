import { getReport } from "../api"
import { useState, useEffect } from "react"
import dayjs from 'dayjs';
import { Plus, Eye, Files } from 'react-bootstrap-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'

export function AnswersList() {

    const [Company, setCompany] = useState('')
    const [answers, setAnswers] = useState([])
    const [doClass, setClass ] = useState('ps-3 border-start border-3 border-primary rounded')
    const [isInitialDataLoading, setIsInitialDataLoading] = useState(true)
    const navigate = useNavigate();


    const companyId  = useParams()
    
    useEffect(() => {
        try {
            setCompany(companyId._id)
        } catch (error) {
            console.error('Error getting CompanyID', error)
        } finally {
            setIsInitialDataLoading(false);
        }
        
    }, [companyId])


    useEffect(() => {
            if (!isInitialDataLoading) {
                async function loadAllAnswers() {
                    const data = await getReport(Company)
                    data.sort((a, b) => a.qid - b.qid);
                    //data.dateCreated= dayjs(data.dateCreated).format('MMMM D, YYYY h:mm A')
                    
                    setAnswers(data)
                    //console.log(data)
                    
                }
                loadAllAnswers()
            }
        }, [isInitialDataLoading])

    

    function handleClick(_id) {
        navigate(`/ReportResults/${_id}`);
        //console.log('Clicked with params:', _id);
      } 

     

    return (
        <div>
            
            <div className="row">
                <div class="page-header">
                    <div class="page-header-left d-flex align-items-center">
                        <div class="page-header-title">
                            <h5 class="m-b-10">Company Results</h5>
                        </div>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/CompanyList">Home</Link></li>
                            <li class="breadcrumb-item">List Answers</li>
                        </ul>
                    </div>
                    <div class="page-header-right ms-auto">
                        <div class="page-header-right-items">

                            <div class="d-flex align-items-center gap-2 page-header-right-items-wrapper">


                                <Link to="/" class="btn btn-primary btn-sm">
                                    <Plus size={12} className="me-2" />
                                    <span>New Assessment</span>
                                </Link>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div>

                <table class="table table-hover no-footer">
                    <thead>
                        <tr >
                            <th class="sorting">Question</th>
                            <th class="sorting">Answer</th>
                            <th class="sorting">Category</th>
                        </tr>
                    </thead>
                    <tbody>


            
            {answers.map((answers) => {

               

                return (

                   


                    <tr class="single-item odd" key={answers.qid}>

                    <td className="d-flex justify-content-left">{answers.results[0].question}</td>
                    <td className="answer">
                        
                        {answers.answer}
                       
                    </td>
                    <td>{answers.results[0].category}</td>
                </tr>



                )
            })}
 </tbody>
                </table>
            </div>
        </div>

    )
    
}