import { getAnswers } from "../api"
import { updateCompany } from "../api"
import { useState, useEffect } from "react"
import { Question } from "../components/Question"
import { useNavigate, useParams } from "react-router-dom"
import useCompanyStore from '../components/companyStore';

export function PreFinal() {
    const [answer, setAnswer] = useState([])
    const [stepNumber, setStepNumber] = useState(40)
    const [categoryId, setCategoryId] = useState(400)
    const [questionId, setQuestionID] = useState(stepNumber)
    const [isInitialDataLoading, setIsInitialDataLoading] = useState(true);
    const [error, setError] = useState([])
    const navigate = useNavigate()
    const [submissionStatus, setSubmissionStatus] = useState({
        isSubmitting: false,
        isSubmitted: false,
        erorr: null,
        submissionId: null
    })

 
    const companyId = useCompanyStore((state) => state.companyId); // Access the companyId
    const [Company, setCompany] = useState('')
    useEffect(() => {
        try {
            setCompany(companyId.id)
        } catch (error) {
            console.error('Error getting CompanyID', error)
        } finally {
            setIsInitialDataLoading(false);
        }
        
    }, [companyId])
    
    const answerData = {
        companyid: Company,
        categoryid: categoryId,
    };

    
    useEffect(() => {
        if (!isInitialDataLoading) {
            async function loadAllQuestions() {
                const data = await getAnswers(answerData)
                setAnswer(data)
            }
            loadAllQuestions()
        }
        
    }, [isInitialDataLoading])

    // ####### CALCULATE THE TOTAL SCORE OF THE SECTION AND SUBMIT TO DATABASE
    let totalScore = answer.reduce((sum, answer) => sum + answer.grade, 0)
    console.log(totalScore)
    
    const scoreData = {
        companyid: Company,
        scoreTotal: totalScore,
        sectionTitle: "recoverTotal"
    }

    async function handleSumbitContinue(e) {
        e.preventDefault()
        try {
            const response = await updateCompany(scoreData)
            //console.log(response)

            if (response.data.success) {
                navigate('/CalculateResults')
            }
            // Update status with successful submission data
            setSubmissionStatus({
                isSubmitting: false,
                isSubmitted: true,
                error: null,
                });
        } catch (error) {
            // Added the 418 error check in backed to reroute - this avoids double entry of quesiton data
            console.error('Error submitting form:', error);
            setSubmissionStatus({
                isSubmitting: false,
                isSubmitted: false,
                error: error.response?.data?.message || 'An error occurred while submitting your data.',
                submissionId: null
            });
        }
        
    }

    return (
       
        
       <div>
            <div>
                {/* Error message */}
                {submissionStatus.error && (
                    <div className="error-message">
                        <div className="error-icon">!</div>
                        <p>{submissionStatus.error}</p>
                    </div>
                )}
                <div className="card-body text-center">
                    <h4>SECTION COMPLETED</h4>
                </div>
                <span className="sectiontitle">This was the last section of the assesment. <b>Please Continue to Complete Assesment.</b></span>

                <div className="row justify-content-md-center">
                    <div className="col col-md-2">
                        <form onSubmit={handleSumbitContinue} className="text-center">
                <button type="submit" className="btn btn-primary btn-lg ht-50 mt-5 wd-full">CONTINUE</button>
                </form>
                <span><small>{totalScore}</small></span>
                    </div>
                </div>
                
            </div>
              
      </div>
        
    )
    
}