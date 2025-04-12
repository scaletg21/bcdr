import { getQuestion } from "../api"
import { createAnswer } from "../api"
import { useState, useEffect } from "react"
import { Question } from "../components/Question"
import { useNavigate, useParams } from "react-router-dom"
import useCompanyStore from '../components/companyStore';

export function Step9() {
    const [stepNumber, setStepNumber] = useState(9)
    const [categoryId, setCategoryId] = useState(100)
    const [question, setQuestion] = useState([])
    const [questionId, setQuestionID] = useState(stepNumber)
    const [isInitialDataLoading, setIsInitialDataLoading] = useState(true);
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
    
    // Data Sent if Answered Yes
    const yesData = {
        answer: "yes",
        companyid: Company,
        qid: questionId,
        categoryid: categoryId,
        grade: 2,
    };

    // Data Sent if Answered No
    const noData = {
        answer: "no",
        companyid: Company,
        qid: questionId,
        categoryid: categoryId,
        grade: 0,
    };

    useEffect(() => {
        async function loadQuestion() {
            try {
                let data = await getQuestion(questionId)
                setQuestion(data)
            } catch (e) {
                setError(e)
            }
        }
        loadQuestion()
    }, [])

    
    const handleClick = () => {
        navigate('/step' + (stepNumber + 1))
      }; 
       
    async function handleSumbitYes(e) {
        e.preventDefault()
        try {
            const response = await createAnswer(yesData)
            //console.log(response)

            if (response.data.success) {
                navigate('/step' + (stepNumber + 1))
            }
            // Update status with successful submission data
            setSubmissionStatus({
                isSubmitting: false,
                isSubmitted: true,
                error: null,
                });
        } catch (error) {
            // Added the 418 error check in backed to reroute - this avoids double entry of quesiton data
            if (error.response && error.response.status === 418) {
                navigate('/step' + (stepNumber + 1))
           
            }else
            console.error('Error submitting form:', error);
            setSubmissionStatus({
                isSubmitting: false,
                isSubmitted: false,
                error: error.response?.data?.message || 'An error occurred while submitting your data.',
                submissionId: null
            });
        }
        
    }

    async function handleSumbitNo(e) {
        e.preventDefault()
        try {
            let response = await createAnswer(noData)
            //console.log(response)

            if (response.data.success) {
                navigate('/step' + (stepNumber + 1))
            }

            // Update status with successful submission data
            setSubmissionStatus({
                isSubmitting: false,
                isSubmitted: true,
                error: null,
            });
        } catch (error) {
             // Added the 418 error check in backed to reroute - this avoids double entry of quesiton data
             if (error.response && error.response.status === 418) {
                navigate('/step' + (stepNumber + 1))
           
            }else
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
        {/* Error message */}
        {submissionStatus.error && (
            <div className="error-message">
                <div className="error-icon">!</div>
                <p>{submissionStatus.error}</p>
            </div>
        )}
        <Question category={question.category} question={question.question} />
        
        {!isInitialDataLoading && (
                <div className="col-12 answer text-center">
                    <form onSubmit={handleSumbitYes}>
                        <button type="submit" className="btn btn-success btn-lg">YES</button>
                    </form>
                    <form onSubmit={handleSumbitNo}>
                        <button type="submit" className="btn btn-danger btn-lg">NO</button>
                    </form>
                </div>
            )}
    </div>
        
    )
    
}