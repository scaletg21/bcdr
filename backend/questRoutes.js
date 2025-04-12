const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const jwt = require('jsonwebtoken')
require("dotenv").config({path: "./config.env"}); 



let questRoutes = express.Router()


//###### - Retreive All Questions
//http://app.scaletg.com:3000/questions
// adding async & await - waits until data finishes processing before moving on 
questRoutes.route("/questions").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("questions").find({}).sort({qid:1}).toArray()
    if (data.length >0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})


//###### Get One Question for Steps
questRoutes.route("/questions/:questionId").get(async (request, response) => {
    let db = database.getDb()
    let questionId = request.params.questionId
    // Need to convert the questionId to an integer. params from uri is a string by default
    let intNum = parseInt(questionId)
    
    const query = { qid: intNum }
    
    let data = await db.collection("questions").findOne(query)
    //## This one was used when using the MongoDB objectID from the URI
    //let data = await db.collection("questions").findOne({_id: new ObjectId (request.params.id)})
    if (Object.keys(data).length >0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})


//#4 - Update One - Currently Not used Yet 4/12/25
questRoutes.route("/questions/:id").put(async (request, response) => {
    let db = database.getDb()
    let intNum = parseInt(request.body.grade)
    let arrayIndex = parseInt(request.body.qid)
    let answer = request.body.answer
    let mongoObject = {
        $set: {
            title: request.body.title,
            
        }
        
    }
    let data = await db.collection("questions").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)
    response.json(data)
})





module.exports = questRoutes