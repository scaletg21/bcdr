const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const jwt = require('jsonwebtoken')
require("dotenv").config({path: "./config.env"}); 



let companyRoutes = express.Router()


//###### - Create Company
companyRoutes.route("/company").post(async (request, response) => {
    let db = database.getDb()

    const takenCompany = await db.collection("results").findOne({company: request.body.company})
    //console.log(takenCompany)
    
    if (takenCompany) {
        console.log("Company already used")
        response.json({message: "Assesment has been completed for this company."})
    } else {

        try {
            let mongoObject = {
                company: request.body.company,
                contact: request.body.contact,
                industry: request.body.industry,
                identifyTotal: 0,
                reactTotal: 0,
                resolveTotal: 0,
                recoverTotal: 0,
                score: 0,
                dateCreated: new Date(),
            }
            
            const data = await db.collection("results").insertOne(mongoObject)
            console.log(data.insertedId.toString())
            //response.json(data)
            
            // Return success response with the document ID
            response.status(201).json({
              success: true,
              message: 'Your survey has been successfully submitted!',
              submissionId: data.insertedId.toString()
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


//### - Update The total score of the section based on the Company ID
companyRoutes.route("/company/:companyid").put(async (request, response) => {
    let db = database.getDb()
    
    //let data = JSON.stringify(request.body)
    //This can't be identifyTotal - 
    let intNum = parseInt(request.body.scoreTotal)
    let getName = request.body.sectionTitle
    

    try {

      let mongoObject = {
        $set: {
          [getName]: intNum
        }
      }


      let data = await db.collection("results").updateOne({ _id: new ObjectId(request.params.companyid) }, mongoObject)
      //response.json(data)

      // Return success response with the document ID
       response.status(201).json({
        success: true,
        message: 'Section Score has been updated!',
        //submissionId: data.insertedId.toString()
      });

    } catch (error) {
      console.error('Error saving survey:', error);
      response.status(500).json({
        success: false,
        message: 'There was an error submitting the section answer. Please try again.'
      });
    }

    
})

module.exports = companyRoutes