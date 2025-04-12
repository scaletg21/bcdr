import { getQuestion } from "../api"
import { createAnswer } from "../api"
import { useState, useEffect } from "react"
//import { Question } from "../components/Question"
import { useNavigate, useParams } from "react-router-dom"
import useCompanyStore from '../components/companyStore';


export function Step1() {

    const [question, setQuestion] = useState([])
    const [questionId, setQuestionID] = useState(1)
    const [categoryId, setCategoryId] = useState(100)
    const [isInitialDataLoading, setIsInitialDataLoading] = useState(true);
    //Get the CompanyID from the URL and store it using Zustand
    const param = useParams()
   
    const { companyId, setCompanyId, clearCompanyId } = useCompanyStore();
  
    useEffect(() => {
        // Simulate fetching user ID from an API or other source
        const fetchCompanyID = async () => {
            // Replace this with your actual data fetching logic
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const fetchedUserID = param;
            setCompanyId(fetchedUserID);
        };
        fetchCompanyID();
    }, [setCompanyId]);
        

    // There was an issue with scope and the companyId was undefined for 1sec
    // ### Also, add this to a step page if to check that companId is in the CompanyStore correctly
    if (companyId && companyId.id) {
        console.log("Company:", companyId.id);
    }
   
    // was getting [object Object] - JSON.stringify fix
    //console.log(JSON.stringify(companyId))

    const navigate = useNavigate()

    //Wait until companyId is defined by fectching zustand and then add it to value of input. 
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
        //grade: "2.5",
    };

    // Data Sent if Answered No
    const noData = {
        answer: "no",
        companyid: Company,
        qid: questionId,
        categoryid: categoryId,
        grade: 0,
        // Grade needs to be a string if using Decimal128 in the route. Otherwise you will get the following error
        //  TypeError: representation.match is not a function
        //grade: "0",
    };

    useEffect(() => {
        async function loadQuestion() {
            //id.toString()
            let data = await getQuestion(questionId)
            let date = new Date(data.dateCreated)
            data.dateCreated = date.toString()
            setQuestion(data)
        }
        loadQuestion()
    }, [])

    const [submissionStatus, setSubmissionStatus] = useState({
        isSubmitting: false,
        isSubmitted: false,
        erorr: null,
        submissionId: null
    })
      
       
    async function handleSumbitYes(e) {
        e.preventDefault()
        try {
            const response = await createAnswer(yesData)
            //console.log(response)
            
            if (response.data.success) {
                navigate('/step2')
            }
            
            // Update status with successful submission data
            setSubmissionStatus({
                isSubmitting: false,
                isSubmitted: true,
                error: null,
                });
        } catch (error) {
            console.error('Error submitting form:', error);
            // Added the 418 error check in backed to reroute - this avoids double 
            // ######## I will enable this later ################
            // if (error.response && error.response.status === 418) {
            // Redirect to the login page
            //   navigate('/login');
            // Optionally, stop further code execution
        //  return Promise.reject('Unauthorized');
            //}else
    
            // Update status with error information
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
            const response = await createAnswer(noData)
            //console.log(response)

            if (response.data.success) {
                navigate('/step2')
            }

            // Update status with successful submission data
            setSubmissionStatus({
                isSubmitting: false,
                isSubmitted: true,
                error: null,
            });
        } catch (error) {
            console.error('Error submitting form:', error);

            // Update status with error information
            setSubmissionStatus({
                isSubmitting: false,
                isSubmitted: false,
                error: error.response?.data?.message || 'An error occurred while submitting your data.',
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
        <div className="card-body text-center">
            <h4>{question.category}</h4>
        </div>
        <h2>{question.question}</h2>
        
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