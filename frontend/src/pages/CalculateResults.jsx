import { getResults } from "../api"
import { updateCompany } from "../api"
import { useState, useEffect } from "react"
import { Question } from "../components/Question"
import { useNavigate, useParams } from "react-router-dom"
import useCompanyStore from '../components/companyStore';

export function CalculateResults() {
    const [results, setResults] = useState([])
    const [isInitialDataLoading, setIsInitialDataLoading] = useState(true);
    const [dataReady, setDataReady] = useState(false)
    const navigate = useNavigate()
    const [submissionStatus, setSubmissionStatus] = useState({
        isSubmitting: false,
        isSubmitted: false,
        erorr: null,
        submissionId: null
    })

 
    const companyId = useCompanyStore((state) => state.companyId); // Access the companyId
    const [Company, setCompany] = useState('')
    //const [Company, setCompany] = useState('67e713af47fe72819fd1bbe6')
    useEffect(() => {
        try {
            setCompany(companyId.id)
        } catch (error) {
            console.error('Error getting CompanyID', error)
        } finally {
            setIsInitialDataLoading(false);
        }
        
    }, [companyId])
    
    // Get Section Answers for the Company based on CompanyID
    useEffect(() => {
        if (!isInitialDataLoading) {
            try {
                async function loadAllResults() {
                    const data = await getResults(Company)
                    setResults(data)

                }
                loadAllResults()
                setDataReady(true)
            } catch (error) {
                console.error('Something Went Wrong With Score Update', error)
            } finally {
                setDataReady(true)
            }
            
        }

    }, [isInitialDataLoading])

    
    // ####### CALCULATE THE TOTAL SCORE OF ALL SECTIONS
    // Use Math.round to round to the nearest integer 
    let totalScore = Math.round(((results.identifyTotal) + (results.reactTotal) + (results.resolveTotal) + (results.recoverTotal)) / 80 * 100)
    console.log(totalScore)
   

    
    const scoreData = {
        companyid: Company,
        scoreTotal: totalScore,
        sectionTitle: "score"
    }

    //const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        if (!isInitialDataLoading && dataReady) {
            try {
                
                async function updateTotalResults() {

                    //await delay(2000); // Wait for 2 seconds
                    const response = await updateCompany(scoreData)
                    if (response.data.success) {
                       navigate('/FinalResults')
                    }
                    setSubmissionStatus({
                        isSubmitting: false,
                        isSubmitted: true,
                        error: null,
                    });

                }
                updateTotalResults()

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

        
    }, [totalScore])

    async function handleSumbitContinue(e) {
        e.preventDefault()
        try {
            const response = await updateCompany(scoreData)
            //console.log(response)

            if (response.data.success) {
                navigate('/FinalResults')
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
                    <h4>CALCULATING DATA....</h4>
                  
                </div>
            </div>
              
      </div>
        
    )
    
}