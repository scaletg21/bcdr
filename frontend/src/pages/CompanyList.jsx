import { getCompany } from "../api"
import { useState, useEffect } from "react"
import dayjs from 'dayjs';
import { Plus, Eye, Files } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'

export function CompanyList() {

    const [companies, setCompanies] = useState([])
    const [doClass, setClass ] = useState('ps-3 border-start border-3 border-primary rounded')
    const navigate = useNavigate();

    useEffect(() => {
        async function loadAllCompany() {
            const data = await getCompany()
            data.sort((d1, d2) => new Date(d2.dateCreated).getTime() - new Date(d1.dateCreated).getTime())
            //data.dateCreated= dayjs(data.dateCreated).format('MMMM D, YYYY h:mm A')
            // Result: "April 19, 2025 4:52 PM"
            
            setCompanies(data)
            //console.log(data)
            
        }
        loadAllCompany()
    }, [])

    function handleReportClick(_id) {
        navigate(`/ReportResults/${_id}`);
        //console.log('Clicked with params:', _id);
      } 
    
    function handleAnswersClick(_id) {
    navigate(`/AnswersList/${_id}`);
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
                            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li class="breadcrumb-item">List Companies</li>
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
                        <div class="d-md-none d-flex align-items-center">
                            <a href="javascript:void(0)" class="page-header-right-open-toggle">
                                <i class="bi bi-airplane-engines-fill"></i>
                            </a>

                        </div>
                    </div>
                </div>
            </div>
            <div>

                <table class="table table-hover no-footer">
                    <thead>
                        <tr >
                            <th class="sorting">Company</th>
                            <th class="sorting">Contact</th>
                            <th class="sorting">Industry</th>
                            <th class="sorting">Date</th>
                            <th class="sorting">Score</th>
                            <th class="sorting">Actions</th>
                        </tr>
                    </thead>
                    <tbody>


            
            {companies.map((companies) => {

                const formattedDate = dayjs(companies.dateCreated).format('MMMM D, YYYY h:mm A');

                return (

                   


                    <tr class="single-item odd" key={companies.company}>

                    <td>{companies.company}</td>
                    <td>
                        
                        {companies.industry}
                       
                    </td>
                    <td>{companies.contact}</td>
                    <td>{formattedDate}</td>
                    <td><b>{companies.score}%</b></td>
                    <td className="d-flex justify-content-center">
                        <div class="hstack gap-2 justify-content-end">
                            
                            <button onClick={() => handleAnswersClick(companies._id)} class="btn btn-secondary btn-sm">
                                <Eye size={12} className="me-2" />
                                <span>View Answers</span>
                            </button>
                           

                            <button onClick={() => handleReportClick(companies._id)} class="btn btn-success btn-sm">
                                <Files size={12} className="me-2" />
                                <span>View Report</span>
                            </button>


                        </div>
                    </td>
                </tr>



                )
            })}
 </tbody>
                </table>
            </div>
        </div>

    )
    
}