//import { createQuestion } from "../api"
import { createCompany } from "../api"
import { useState } from "react"
//import { Question } from "../components/Question"
import { useNavigate } from "react-router-dom"
//67d1d60f6d185dde0e8b2c3d

export function Step0() {

    
    const [company, setCompany] = useState({
        company: "",
        contact: "",
        industry: ""
    })

    const [selectedValue, setSelectedValue] = useState('');
    const navigate = useNavigate();
    const [submissionStatus, setSubmissionStatus] = useState({
        isSubmitting: false, 
        isSubmitted: false,
        erorr: null,
        submissionId: null
    })

    function handleChange(e) {
        setCompany({ ...company, [e.target.name]: e.target.value  })
        setSelectedValue(e.target.value);
    }


    
    async function handleSumbit(e) {

        e.preventDefault()

        try {
            let response = await createCompany(company)
            console.log(response)
            
            // Update status with successful submission data
            setSubmissionStatus({
                isSubmitting: false,
                isSubmitted: true,
                error: null,
                submissionId: response.data.submissionId
                });
        } catch (error) {
            console.error('Error submitting form:', error);
    
            // Update status with error information
            setSubmissionStatus({
                isSubmitting: false,
                isSubmitted: false,
                error: error.response?.data?.message || 'An error occurred while submitting your data.',
                submissionId: null
            });
        }
        
    }

    /*
    const [company, setCompany] = useState("")
    const [contact, setContact] = useState("")
    //const [content, setContent] = useState("")

    async function handleSubmit() {
        let submitObject = {
            company: company,
            contact: contact,
            industry: null,
            dateCreated: new Date()
        }
        await createQuestion(submitObject)
        
    } 
    */
    
    return (
       
        
        <div>
            <div className="card-body text-center">
                <h4>ENTER DETAILS</h4>

                {submissionStatus.isSubmitted && (
                    <div className="success-message">
                        <div className="success-icon">:)</div>
                        <h1>Let's Go!</h1>
                        <p>The assesment will be a total of four sections. We will begin with questions reagarding <b>IDENTIFICATION - Risk Assessment & Preparedness</b>. </p>
                        {submissionStatus.submissionId && (
                            <p className="submission-id">
                                <small>Company ID: <span>{submissionStatus.submissionId}</span></small>
                            </p>
                        )}
                    </div>
                )}

                {/* Error message */}
                {submissionStatus.error && (
                    <div className="error-message">
                        <div className="error-icon">!</div>
                        <p>{submissionStatus.error}</p>
                    </div>
                )}
            </div>

            {/* Do not show form after submitted */}
            {!submissionStatus.isSubmitted && (
            <form onSubmit={handleSumbit}>
                <div className="container">
                    <div className="row inputStyle">
                        <div className="mb-5 col-4">
                            <div className="ps-1 text-start">
                                <label className="form-label text-muted">Organization</label>
                            </div>
                            <input onChange={handleChange} maxLength={100} required type="text" name="company" className="form-control form-control-lg" placeholder="Company Name"></input>
                            <small className="form-text text-muted">Your company name [Ex: Acme Inc.]</small>
                        </div>
                        <div className="mb-5 col-4">
                            <div className="ps-1 text-start">
                                <label className="form-label text-muted">Contact</label>
                            </div>
                            <input onChange={handleChange} maxLength={100} required type="text" name="contact" className="form-control form-control-lg" placeholder="Contact Name"></input>
                            <small className="form-text text-muted">Contact name [Ex: Same Smith]</small>
                        </div>
                        <div className="mb-5 col-4">
                            <div className="ps-1 text-start">
                                <label className="form-label text-muted">Contact</label>
                            </div>
                            <select value={selectedValue} onChange={handleChange} required name="industry" className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                <option value="">Select Industry</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Health Care">Health Care</option>
                                <option value="Insurance">Insurance</option>
                                <option value="Finance">Finance</option>
                                <option value="Construction/Engineering">Construction/Engineering</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Retail">Retail</option>
                                <option value="Education">Education</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className="btn-group gap-5 col-6 ht-50 answer" role="group">
                    <button type="submit" className="btn btn-success">SUBMIT</button>
                </div>
            </form>
            )}
            <div className="d-flex justify-content-center">
                {/* Show Button To Continue to Questions */}
                {submissionStatus.isSubmitted && (
                    <button onClick={() => navigate('/step1/' + submissionStatus.submissionId)} className="btn btn-primary btn-lg">
                        Go To Questions</button>
                )}
            </div>
    
        </div>
        
    )
    
}