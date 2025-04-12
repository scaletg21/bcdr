// MIDDLEWARE
const connect = require("./connect")
const express = require("express")
const cors = require("cors")
const questions = require("./questRoutes") //this is defining the app.use(questions) below
const company = require("./companyRoutes")
const answer = require("./answerRoutes")
const results = require("./resultRoutes")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(questions)
app.use(company)
app.use(answer)
app.use(results)

app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Server is running on port ${PORT}`)
})