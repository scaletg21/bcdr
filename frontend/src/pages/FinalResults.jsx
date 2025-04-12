import { getResults } from "../api"
import { useState, useEffect } from "react"
import useCompanyStore from '../components/companyStore';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function FinalResults() {

    
    const [results, setResults] = useState([])
    const [isInitialDataLoading, setIsInitialDataLoading] = useState(true)
    const [dataReady, setDataReady] = useState(false)
    

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
    
    useEffect(() => {
        if (!isInitialDataLoading) {
            async function loadAllResults() {
                const data = await getResults(Company)
                setResults(data)
            }
            loadAllResults()
        }
    }, [isInitialDataLoading])

 let finalScore = results.score
 let finalIdentify = Math.round(((results.identifyTotal) / 20) * 100)
 let identifyColor = "#eee"
 let finalReact = Math.round(((results.reactTotal) / 20) * 100)
 let reactColor = "#eee"
 let finalResolve = Math.round(((results.resolveTotal) / 20) * 100)
 let resolveColor = "#eee"
 let finalRecover = Math.round(((results.recoverTotal) / 20) * 100)
 let recoverColor = "#eee"
 let finalGrade = "#eee"

        if (finalScore >= 96) {
            finalGrade = "#EFBF04" 
            console.log("you have reach the gold standard")
        } else if
        (finalScore >= 80 && finalScore < 96) {
          console.log("less than 96 but greater than 80")
          finalGrade = "#17C666"
        } else if
        (finalScore <= 79 && finalScore >= 60) {
            console.log("less than 80 but greater than 60")
            finalGrade = "#EFBF04"
        } else if
        (finalScore <= 59 ) {
            console.log("Damn Son, less than 60")
            finalGrade = "#EA4D4D"
        }
        //###### IDENTIFY TOTALS #######
        if (finalIdentify >= 80) {
            identifyColor = "#17C666"
        } else if
        (finalIdentify <= 79 && finalIdentify >= 60) {
            identifyColor = "#EFBF04"
        } else if
        (finalIdentify <= 59 ) {
            identifyColor = "#EA4D4D"
        }
         //###### RECOVER TOTALS #######
         if (finalRecover >= 80) {
            recoverColor = "#17C666"
        } else if
        (finalRecover <= 79 && finalRecover >= 60) {
            recoverColor = "#EFBF04"
        } else if
        (finalRecover <= 59 ) {
            recoverColor = "#EA4D4D"
        }
        //###### RESOLVE TOTALS #######
        if (finalResolve >= 80) {
            resolveColor = "#17C666"
        } else if
        (finalResolve <= 79 && finalResolve >= 60) {
            resolveColor = "#EFBF04"
        } else if
        (finalResolve <= 59 ) {
            resolveColor = "#EA4D4D"
        }
         //###### REACT TOTALS #######
         if (finalReact >= 80) {
            reactColor = "#17C666"
        } else if
        (finalReact <= 79 && finalReact >= 60) {
            reactColor = "#EFBF04"
        } else if
        (finalReact <= 59 ) {
            reactColor  = "#EA4D4D"
        }
    
    
    return (
       
        <div>
           
            <h1>{results.company}: FINAL RESULTS</h1>
            <hr className="border-dashed my-3"></hr>
            
            <div className="container">
                <div className="row justify-content-md-center">
                <div className="col-xxl-4">
                        <div className="card stretch stretch-full">
                            <div className="card-header justify-content-md-center">
                                <h5 className="card-title">OVERALL BCDR SCORE TOTAL</h5>
                            </div>
                            <div className="card-body custom-card-action">
                                <div className="text-center mb-4">
                                    <div className="total-score">
                                        <CircularProgressbar value={results.score} text={`${results.score}%`} background='true' styles={buildStyles({ pathColor: `${finalGrade}` })} />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                               
                                <button onClick={() => print()} className="btn w-100 btn-primary">Generate Report</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xxl-12 bcdr-info-top">
                        <h5> The role of BCDR is to minimize the effects of outages and disruptions on business operations.</h5>
                        
                        <p>                        
                         BCDR practices enable an organization to get back on its feet after problems occur, reduce the risk of data loss and reputational harm, and improve operations while decreasing the chance of emergencies.
                        </p>
                        <p>
                        BCDR professionals can help an organization create a strategy for achieving resiliency. Developing such a strategy is a complex process that involves conducting a <b>Business Impact Analysis (BIA) and Risk Analysis</b> as well as developing BCDR plans, tests, exercises and training.
                        </p>
                    </div>
                    
                </div>
            <div className="row">
                <div className="col-lg-12">
                        <div className="card stretch stretch-full">
                            <div className="card-body">
                                <div className="row g-4">
                                    <div className="col-xxl-3 col-md-3">
                                        <div className="border border-dashed border-gray-5 p-4 rounded-3 gap-4 text-center">
                                            <div className="circle-progress-identify">
                                                <CircularProgressbar value={finalIdentify} text={`${finalIdentify}%`} background='true' styles={buildStyles({ pathColor: `${identifyColor}` })} />
                                            </div>
                                            <div className="mt-4">
                                                <p className="fs-12 text-muted mb-1">IDENTIFY</p>
                                                <b className="fw-bold text-truncate-1-line">(Risk Assessment & Preparedness)</b>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-md-3">
                                        <div className="border border-dashed border-gray-5 p-4 rounded-3 gap-4 text-center">
                                            <div className="circle-progress-react">
                                                <CircularProgressbar value={finalReact} text={`${finalReact}%`} background='true' styles={buildStyles({ pathColor: `${reactColor}` })} />
                                            </div>
                                            <div className="mt-4">
                                                <p className="fs-12 text-muted mb-1">REACT</p>
                                                <b className="fw-bold text-truncate-1-line">(Incident Response & Initial Actions)</b>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-md-3">
                                        <div className="border border-dashed border-gray-5 p-4 rounded-3 gap-4 text-center">
                                            <div className="circle-progress-resolve">
                                                <CircularProgressbar value={finalResolve} text={`${finalResolve}%`} background='true' styles={buildStyles({ pathColor: `${resolveColor}` })} />  
                                            </div>
                                            <div className="mt-4">
                                                <p className="fs-12 text-muted mb-1">RESOLVE</p>
                                                <b className="fw-bold text-truncate-1-line">(Containment & Mitigation)</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-md-3">
                                        <div className="border border-dashed border-gray-5 p-4 rounded-3 gap-4 text-center">
                                            <div className="circle-progress-recover">
                                                <CircularProgressbar value={finalRecover} text={`${finalRecover}%`} background='true' styles={buildStyles({ pathColor: `${recoverColor}` })} />
                                            </div>
                                            <div className="mt-4">
                                                <p className="fs-12 text-muted mb-1">RECOVER</p>
                                                <b className="fw-bold text-truncate-1-line">(Post-Incident Security Hardening & Continuous Improvement)</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="row">
                <div className="col-xxl-12 bcdr-info-bottom">
                <p>
                Fifty-five percent of respondents to Uptime Institute's 2023 "Global Data Center Survey" had some sort of outage in the past three years. The annual survey, which polled more than 850 data center operators, reflected a downward trend in the percentage of organizations experiencing outages. In the 2020 survey, for example, 78% of the respondents reported an outage, according to Uptime Institute, a New York-based data center standards, professional services and training organization. The 2023 figure was the lowest recorded in the 13 years the survey has been conducted.
                </p>
                <p>
                The report on the survey credited an increased focus on BCDR practices for the ongoing improvements, but also indicated that more needs to be done. "Uptime data shows that data center owners/operators have been investing in resiliency, adding more redundancy," the report stated. "In spite of this, outages remain an issue."
                </p>

                </div>
            </div>            
            </div>

        </div>

    )
    
}