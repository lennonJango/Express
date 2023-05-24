const fs = require("fs")
const express = require("express")

const app = express()
app.use(express.json())
const port = 8000

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tour.json`))

app.get("/api/tours/v1", (req, res) => {
    
    res.status(200).json({
        status: "Success",
        data: {
            tours
        }
    });
})

app.post("/api/tours/v1", (req, res) => {
    const newID = tours[tours.length - 1].id+1
    const newTour = Object.assign({ "id": newID }, req.body);
    tours.push(newTour)

    fs.writeFile(`${__dirname}/dev-data/data/tour.json`, JSON.stringify(tours), err => RangeError(err));
    res.status(201).json({
        status: "Success",
        message: "File atualizado",
        data: Date.now(),
        dados : tours,
    })
   
})


//Respondedo com parametros

app.get("/api/tours/v1/:id", (req, res) => {
    // console.log(req.params)
    const id = Number(req.params.id);
    if (id >= tours.length) { 
        return res.status(404).json({
            status: "Fail",
            message:"Id Invalido"
       })
    } 

    const tour = tours.find(el => el.id === id)
    res.status(201).json({
        status: "Sucess",
        data: {
            tour
        }
     })
})


app.listen(port, () => {
    console.log(`Servidor is running on port ${port}`);
})