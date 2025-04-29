const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const jwt = require('jsonwebtoken')
require("dotenv").config({path: "./config.env"}); 


let reportRoutes = express.Router()

// 
//###### - Retreive Answers for a section Customer
reportRoutes.route("/report/:companyId").get(async (request, response) => {
    
    //Pipeline Code created in Atlas 
    //http://192.168.2.226:3000/api/report/67fe7b1f4aa49ff5b76ebc4a
    //CompanyID = '67fe7b1f4aa49ff5b76ebc4a'
    let CompanyID = request.params.companyId 
    //console.log(request.params.companyId)
    const agg = [
        {
          '$match': {
            'companyid': CompanyID
          }
        }, {
          '$lookup': {
            'from': 'questions', 
            'localField': 'qid', 
            'foreignField': 'qid', 
            'as': 'results'
          }
        }
      ];
    try { 
      let db = database.getDb()
      let data = await db.collection("answers").aggregate(agg).toArray();

    if (data) {
      // Data was found
      response.json(data)
    } else {
      // No data found, send appropriate status code
      response.status(404).json({ message: "Data not found"})
    }
    } catch (error) {
      // Handle other errors (like invalid ObjectId format)
      console.error("Error fetching data:", error)
      response.status(500).json({message: "Server error", error: error.message })
    }
    
    //if (data.length >0) {
    //    response.json(data)
    //} else {
    //    throw new Error("Data was not found :(")
    //}
})

//###### - Get the Answers based on the company ID
reportRoutes.route("/report/:companyId").get(async (request, response) => {
    let db = database.getDb()
    //console.log(request.params.companyId)
    let data = await db.collection("results").findOne({_id: new ObjectId(request.params.companyId)})

    if (Object.keys(data).length >0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})

module.exports = reportRoutes