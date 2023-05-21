const fs = require("fs")
const express = require("express")

const app = express()
const port = 8000

const tour = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tour.json`))

app.get("/api/tours/v1", (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})