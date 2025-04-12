const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const jwt = require('jsonwebtoken')
require("dotenv").config({path: "./config.env"}); 


let resultRoutes = express.Router()

// 
//###### - Retreive Answers for a section Customer
resultRoutes.route("/results").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("results").find({}).toArray()
    if (data.length >0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})

//###### - Get the Answers based on the company ID
resultRoutes.route("/results/:companyId").get(async (request, response) => {
    let db = database.getDb()
    //console.log(request.params.companyId)
    let data = await db.collection("results").findOne({_id: new ObjectId(request.params.companyId)})
    if (Object.keys(data).length >0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})

module.exports = resultRoutes