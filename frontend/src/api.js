// This is for all of the axio calls for fetching/adding data to mongodb
import axios from "axios";
import { data } from "react-router-dom";

const URL = "http://165.22.47.81:3000"

//################ QUESTIONS ################
//# Get All Questions
export async function getQuestions() {
    const response = await axios.get(`${URL}/questions`)
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
    
    const response = await axios.get(`${URL}/questions/${questionId}`)
    const question = response.data
    return question
}


//################ COMPANY ################
//## Create Company and Results Schema
export async function createCompany(company) {
    console.log(company)
    const response = await axios.post(`${URL}/company`, company)
    return response 
}

export async function updateCompany(company) {
    //"http://localhost:3000/users/12345"
    console.log(company)
    const response = await axios.put(`${URL}/company/${company.companyid}`, company)
    return response
}

//################ ANSWER ################
//## Submit Answer to database
export async function createAnswer(answer) {
    //console.log(answer)
    const response = await axios.post(`${URL}/answer`, answer)
    return response 
}

///#### Get All Answers based on CompanyID
export async function getAnswers(answer) {
    //console.log(answer)
    const response = await axios.get(`${URL}/answer`, {params: { companyid: answer.companyid, categoryid: answer.categoryid },})
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
    
    const response = await axios.get(`${URL}/results/${companyId}`)
    const results = response.data
    return results
}

