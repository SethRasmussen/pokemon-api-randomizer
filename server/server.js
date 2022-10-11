require("dotenv").config();
console.log(process.env)
const express = require('express')
const cors = require("cors");
const path = require("path")



const app = express()
const port = process.env.port;

const { shufflePokemon } = require("./controller");

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});



app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/styles.css"))
});

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.js"))
});

//Endpoints

app.post('/api/myteam/', shufflePokemon);






app.listen(port, () => console.log('Server running'))