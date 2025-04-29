// MIDDLEWARE
const connect = require("./connect")
const express = require("express")
const cors = require("cors")
const questions = require("./questRoutes") //this is defining the app.use(questions) below
const company = require("./companyRoutes")
const answer = require("./answerRoutes")
const results = require("./resultRoutes")
const report = require("./reportRoutes")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api', questions)
app.use('/api', company)
app.use('/api', answer)
app.use('/api', results)
app.use('/api', report)

app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Server is running on port ${PORT}`)
})