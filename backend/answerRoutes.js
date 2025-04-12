const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const jwt = require('jsonwebtoken')
require("dotenv").config({path: "./config.env"}); 
const { MongoClient, Decimal128 } = require('mongodb');




let answerRoutes = express.Router()


//###### - Sumbit Answer
answerRoutes.route("/answer").post(async (request, response) => {
    let db = database.getDb()

    const answeredQuestion = await db.collection("answers").findOne({companyid: request.body.companyid, qid: request.body.qid})
    //console.log("You Already Answered This Question")
    if (answeredQuestion) {
      console.log("You Already Answered This Question")
      //response.json({message: "Assesment has been completed for this company."})
      //## Sending error 418 because it just says I/m a little tea pot - this should redirect on the step pages.
      response.status(418).json({
        success: false,
        message: 'Sorry, this question was already answered. So happy I coded this check.'
      });
    } else {   
      try {
          let mongoObject = {
              qid: request.body.qid,
              categoryid: request.body.categoryid,
              companyid: request.body.companyid,
              answer: request.body.answer,
              grade: request.body.grade,
              //grade: Decimal128.fromString(request.body.grade),
              answerDate: new Date(),
          }
          
          const data = await db.collection("answers").insertOne(mongoObject)
          //console.log(data.insertedId.toString())
          //response.json(data)
          
          // Return success response with the document ID
          response.status(201).json({
            success: true,
            message: 'Your survey has been successfully submitted!',
            //submissionId: data.insertedId.toString()
          });
          
        } catch (error) {
          console.error('Error saving survey:', error);
          response.status(500).json({
            success: false,
            message: 'There was an error submitting your survey. Please try again.'
          });
        }
      }
    
})

// ##### GET ALL OF THE ANSWERS THAT ARE FROM THE COMPANY AND ARE A SPECIFIC CATEGORY
answerRoutes.route("/answer").get(async (request, response) => {
    let db = database.getDb()
    
    let companyID = request.query.companyid
    let categoryID = request.query.categoryid
    let intNum = parseInt(categoryID)
    // Need to convert the questionId to an integer. params from uri is a string by default
    //let intNum = parseInt(request.params.categoryid)
    const query = { companyid: companyID, categoryid: intNum }
    
    let data = await db.collection("answers").find(query).toArray()
    if (data.length >0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})


//### - Update the specific answer ## This isn't used yet. Decide on back button to change answer
answerRoutes.route("/answer/:id").put(async (request, response) => {
    let db = database.getDb()
    let intNum = parseInt(request.body.grade)
    let strNumber = "identify." + intNum + ".answer"
    let mongoObject = {
        $set: {
            [strNumber]: request.body.answer,
            "identify.0.grade": request.body.grade
        }
    }
    let data = await db.collection("results").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)
    response.json(data)
})




module.exports = answerRoutes