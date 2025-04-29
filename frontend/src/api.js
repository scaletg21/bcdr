// This is for all of the axio calls for fetching/adding data to mongodb
import axios from "axios";
import { data } from "react-router-dom";

const URL = "http://192.168.2.226:3000"

axios.defaults.baseURL = 'http://192.168.2.226:3000/api' //can use this method and instead calls '/questions' no need for ${URL}

//################ QUESTIONS ################
//# Get All Questions
export async function getQuestions() {
    const response = await axios.get(`/questions`)
    //console.log(response)
    if (response.status === 200) {
        return response.data
    } else {
        return
    }
}

//## Get One Question
export async function getQuestion(questionId) {
    //console.log(questionId)
    //"http://localhost:3000/questions/12345"
    
    const response = await axios.get(`/questions/${questionId}`)
    const question = response.data
    return question
}


//################ COMPANY ################
//## Create Company and Results Schema
export async function createCompany(company) {
    console.log(company)
    const response = await axios.post(`/company`, company)
    return response 
}

//## Update Company
export async function updateCompany(company) {
    //"http://localhost:3000/users/12345"
    console.log(company)
    const response = await axios.put(`/company/${company.companyid}`, company)
    return response
}

//# Get All Companies
export async function getCompany() {
    const response = await axios.get(`/company`)
    //console.log(response)
    if (response.status === 200) {
        return response.data
    } else {
        return
    }
}

//################ ANSWER ################
//## Submit Answer to database
export async function createAnswer(answer) {
    //console.log(answer)
    const response = await axios.post(`/answer`, answer)
    return response 
}

///#### Get All Answers based on CompanyID
export async function getAnswers(answer) {
    //console.log(answer)
    const response = await axios.get(`/answer`, {params: { companyid: answer.companyid, categoryid: answer.categoryid },})
      //  console.log(response.data)
    if (response.status === 200) {
        return response.data
    } else {
        return
    }
}


//################ RESULTS ################
// ### Get Results based on the company ID
export async function getResults(companyId) {
    console.log(companyId)
    //"http://localhost:3000/questions/12345"
    
    const response = await axios.get(`/results/${companyId}`)
    const results = response.data
    return results
}

//################ REPORT ################
// ### Get Results based on the company ID
export async function getReport(companyId) {
    console.log(companyId)
    //"http://localhost:3000/questions/12345"
    
    const response = await axios.get(`/report/${companyId}`)
    const results = response.data
    return results
}


